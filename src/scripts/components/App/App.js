import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import AppContext from "../../../contexts/AppContext";
import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import {
  GET_MOVIE_ERROR,
  NO_SAVED_MOVIES_TEXT,
  BEAT_FILM_URL,
  UPDATE_USER_SUCCESS,
  LOG_IN_SUCCSESS
} from "../../utils/constants";

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loggining, setLoggining] = React.useState({ loggedIn: false });
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = React.useState(false);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [getMovieError, setGetMovieError] = React.useState(null);
  const [startPreloader, setStartPreloader] = React.useState(false);
  const [noMoviesText, setNoMoviesText] = React.useState("");
  const [noSavedMoviesText, setNoSavedMoviesText] = React.useState("");
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(null);
  const [infoToolTipText, setInfoToolTipText] = React.useState("");

  const getSavedMovies = () => {
    const tokenFromStorage = localStorage.getItem("token");
    mainApi
      .getMovies(tokenFromStorage)
      .then((movies) => {
        return movies.data.map((item) => {
          return { ...item };
        });
      })
      .then((savedMoviesData) => {
        mainApi.getUserData(token).then((user) => {
          const ownersMovies= savedMoviesData.filter((i) => i.owner === user._id)
          setSavedMovies(ownersMovies);
          localStorage.setItem("savedMovies", JSON.stringify(ownersMovies));
        });
      })
      .catch(() => {
        setGetMovieError(GET_MOVIE_ERROR);
      });
  };

  function signOut() {
    localStorage.clear();
    setSavedMovies([]);
    history.push("/");
    setLoggining({
      loggedIn: false,
    });
  }

  React.useEffect(() => {
    if (loggining) {
      mainApi
        .getUserData(token)
        .then((user) => {
          setCurrentUser(user);
          const savMovies = JSON.parse(localStorage.getItem("savedMovies"));
          if (savMovies) {
            setSavedMovies(savMovies);
          } else {
            getSavedMovies();
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggining, token]);

  const handleSearchFilter = (searchQuery, data) => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase();

      const filterSearchQuery = (query) => {
        return (
          JSON.stringify(query.nameRU).toLowerCase().includes(search) ||
          JSON.stringify(query.nameEN).toLowerCase().includes(search)
        );
      };

      return data.filter(filterSearchQuery);
    }
  };

  async function handleSearchMovies(searchName, isSavedMovies) {
    setIsLoading(true);
    setStartPreloader(true);
    const savedMoviesDataFromStorage = JSON.parse(
      localStorage.getItem("savedMovies")
    );

    moviesApi
      .getMovies()
      .then((movies) => {
        const moviesFromBeatFilm = movies.map((item) => {
          return {
            movieId: item.id,
            country: item.country,
            director: item.director,
            duration: item.duration,
            year: item.year,
            description: item.description,
            image: `${BEAT_FILM_URL}${item.image.url}`,
            trailerLink: item.trailerLink,
            thumbnail: `${BEAT_FILM_URL}${item.image.formats.thumbnail.url}`,
            nameRU: item.nameRU,
            nameEN: item.nameEN,
          };
        });
        localStorage.setItem("movies", JSON.stringify(moviesFromBeatFilm));
        return moviesFromBeatFilm;
      })
      .then((data) => {
        if (!isSavedMovies) {
          const filteredMovies = handleSearchFilter(
            searchName,
            data
          );
          setStartPreloader(false);
          localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
          if (filteredMovies.length === 0) {
            setNoMoviesText(NO_SAVED_MOVIES_TEXT);
          } else {
            setNoMoviesText("");
          }
          setIsLoading(false);
        } else {
          const filteredSavedMovies = handleSearchFilter(
            searchName,
            savedMoviesDataFromStorage
          );
          setFilteredSavedMovies(filteredSavedMovies);
          setStartPreloader(false);
          if (filteredSavedMovies.length === 0) {
            setNoSavedMoviesText(NO_SAVED_MOVIES_TEXT);
          } else {
            setNoSavedMoviesText("");
          }
          setIsLoading(false);
        }
      })
      .catch(() => {
        setGetMovieError(GET_MOVIE_ERROR);
      });
  };

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (!token) return;
    auth
      .checkToken(token)
      .then((res) => {
        if (!res) return;
        setCurrentUser(res);
        setLoggining({
          loggedIn: true,
        });
        history.push(location.pathname);
        if(["/sign-in"].includes(location.pathname) || ["/sign-up"].includes(location.pathname)){
          history.push("/movies")
        }
      })
      .catch((res) => console.log(res));
  }

  React.useEffect(() => {
    tokenCheck();
    localStorage.removeItem('filterDurationMovies');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('filteredMovies');
  }, []);

  function handleUpdateUser(data) {
    setIsLoading(true);
    const tokenFromStorage = localStorage.getItem("token");
    mainApi
      .patchUserData(data, tokenFromStorage)
      .then(() => {
        currentUser.name = data.name;
        currentUser.email = data.email;
        setInfoTooltipPopupOpen(true);
        setIsSuccsess(true);
        setInfoToolTipText(UPDATE_USER_SUCCESS);
      })
      .catch((err) => {
        setInfoTooltipPopupOpen(true);
        setIsSuccsess(false);
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(token, data) {
    if (!token) return;
    setCurrentUser(data);
    localStorage.setItem("token", token);
    setLoggining((old) => ({ ...old, loggedIn: true }));
    history.push("/movies");
  }

  const [isSuccsess, setIsSuccsess] = React.useState(null);

  const handleSignIn = (email, password) => {
    auth
      .authorize(password, email)
      .then((data) => {
        if (!data.token){
          setIsSuccsess(false)
          return;
        }
        setInfoTooltipPopupOpen(true);
        setIsSuccsess(true);
        setInfoToolTipText(LOG_IN_SUCCSESS);
        return data.token;
      })
      .then((token) => {
        mainApi
          .getUserData(token)
            .then((data) => {
              handleLogin(token, data);
            })
      })
      .catch((err) => {
        setInfoTooltipPopupOpen(true);
        setIsSuccsess(false);
        console.log(err);
      });
  };

  const handleMovieDelete = (movie) => {
    const tokenFromStorage = localStorage.getItem("token");
    mainApi
      .deleteMovie(movie._id, tokenFromStorage)
      .then((res) => {
        if (res) {
          const newSavedMovies = savedMovies.filter((i) => i.movieId !== res.data.movieId);
          setSavedMovies(newSavedMovies);
          console.log("here");
          console.log(newSavedMovies)
          localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleMovieLike(movie) {
    const isLiked = savedMovies.some(
      (item) => Number(item.movieId) === movie.movieId
    );
    const tokenFromStorage = localStorage.getItem("token");
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      mainApi
        .postMovie(movie, tokenFromStorage)
        .then((movie) => {
          setSavedMovies([...savedMovies, movie.data]);
          localStorage.setItem(
            "savedMovies",
            JSON.stringify([...savedMovies, movie.data])
          );
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      const deletedMovie = savedMovies.filter(
        (i) => Number(i.movieId) === movie.movieId
      );
      mainApi
        .deleteMovie(deletedMovie[0]._id, tokenFromStorage)
        .then((res) => {
          if (res) {
            const newSavedMovies = savedMovies.filter((i) => i.movieId !== res.data.movieId);
            setSavedMovies(newSavedMovies);
            localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function closePopup() {
    setInfoTooltipPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value={{ loggedIn: loggining.loggedIn }}>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute exact path="/movies">
              <Movies
                likedMovies={savedMovies}
                onSearchMovies={handleSearchMovies}
                handleMovieLike={handleMovieLike}
                handleMovieDelete={handleMovieDelete}
                startPreloader={startPreloader}
                noMoviesText={noMoviesText}
                getMovieError={getMovieError}
                isLoading={isLoading}
              />
            </ProtectedRoute>
            <ProtectedRoute exact path="/profile">
              <Profile onUpdateUser={handleUpdateUser} signOut={signOut} isLoading={isLoading}/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/saved-movies">
              <SavedMovies
                savedMovies={savedMovies}
                filteredSavedMovies={filteredSavedMovies}
                onSearchMovies={handleSearchMovies}
                handleMovieDelete={handleMovieDelete}
                startPreloader={startPreloader}
                noSavedMoviesText={noSavedMoviesText}
                getMovieError={getMovieError}
                isLoading={isLoading}
              />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register
                handleSignIn={handleSignIn}
                setIsSuccsess={setIsSuccsess}
                setInfoTooltipPopupOpen={setInfoTooltipPopupOpen}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                handleSignIn={handleSignIn}
              />
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
          <InfoTooltip
            onClose={closePopup}
            register={infoTooltipPopupOpen}
            isSuccsess={isSuccsess}
            infoToolTipText={infoToolTipText}
          />
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
