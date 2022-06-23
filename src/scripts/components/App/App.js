import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loggining, setLoggining] = React.useState({ loggedIn: false });
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [getMovieError, setGetMovieError] = React.useState(null);
  const [startPreloader, setStartPreloader] = React.useState(false);
  const [noMoviesText, setNoMoviesText] = React.useState("");
  const [noSavedMoviesText, setNoSavedMoviesText] = React.useState("");
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(null);

  const getMoviesFromBeatFilm = () => {
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
            image: `https://api.nomoreparties.co${item.image.url}`,
            trailerLink: item.trailerLink,
            thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
            nameRU: item.nameRU,
            nameEN: item.nameEN,
          };
        });

        localStorage.setItem("movies", JSON.stringify(moviesFromBeatFilm));
        setMovies(moviesFromBeatFilm);
      })
      .catch(() => {
        setGetMovieError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  };

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
          setSavedMovies(savedMoviesData.filter((i) => i.owner === user._id));
          localStorage.setItem("savedMovies", JSON.stringify(savedMoviesData));
        });
      })
      .catch(() => {
        setGetMovieError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  };

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    setMovies([]);
    setSavedMovies([]);
    history.push("/sign-in");
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
          const moviesBeatFilm = JSON.parse(localStorage.getItem("movies"));
          if (moviesBeatFilm) {
            setMovies(moviesBeatFilm);
          } else {
            getMoviesFromBeatFilm();
          }
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

  const handleSearchMovies = (searchQuery, isSavedMovies) => {
    setStartPreloader(true);
    const moviesDataFromStorage = JSON.parse(localStorage.getItem("movies"));
    const savedMoviesDataFromStorage = JSON.parse(
      localStorage.getItem("savedMovies")
    );

    if (moviesDataFromStorage) {
      if (!isSavedMovies) {
        const filteredMovies = handleSearchFilter(
          searchQuery,
          moviesDataFromStorage
        );
        setFilteredMovies(filteredMovies);
        setStartPreloader(false);
        if (filteredMovies.length === 0) {
          setNoMoviesText("Ничего не найдено");
        } else {
          setNoMoviesText("");
        }
      } else {
        const filteredSavedMovies = handleSearchFilter(
          searchQuery,
          savedMoviesDataFromStorage
        );
        setFilteredSavedMovies(filteredSavedMovies);
        console.log(filteredSavedMovies);
        setStartPreloader(false);
        if (filteredSavedMovies.length === 0) {
          setNoSavedMoviesText("Ничего не найдено");
        } else {
          setNoSavedMoviesText("");
        }
      }
    }
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
        history.push("/movies");
      })
      .catch((res) => console.log(res));
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleUpdateUser(data) {
    setIsLoading(true);
    const tokenFromStorage = localStorage.getItem("token");
    mainApi
      .patchUserData(data, tokenFromStorage)
      .then(() => {
        currentUser.name = data.name;
        currentUser.email = data.email;
      })
      .catch((err) => {
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

  function handleInfoTooltip(boolean, historyPush, register) {
    if (historyPush) {
      history.push("/sign-in");
    }
    if (register) {
      setLoggining(false);
    }
    setInfoTooltipPopupOpen(boolean);
  }

  const handleMovieDelete = (movie) => {
    const tokenFromStorage = localStorage.getItem("token");
    mainApi
      .deleteMovie(movie._id, tokenFromStorage)
      .then((res) => {
        if (res) {
          setSavedMovies(
            savedMovies.filter((i) => i.movieId !== res.data.movieId)
          );
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
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
            setSavedMovies(
              savedMovies.filter((i) => i.movieId !== res.data.movieId)
            );
            localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
          }
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  function handleDelete() {
    console.log("delete");
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
            <ProtectedRoute path="/movies">
              <Movies
                movies={filteredMovies}
                likedMovies={savedMovies}
                onSearchMovies={handleSearchMovies}
                handleMovieLike={handleMovieLike}
                handleMovieDelete={handleMovieDelete}
                handleDelete={handleDelete}
                startPreloader={startPreloader}
                noMoviesText={noMoviesText}
                getMovieError={getMovieError}
              />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile onUpdateUser={handleUpdateUser} signOut={signOut} />
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies">
              <SavedMovies
                savedMovies={savedMovies}
                filteredSavedMovies={filteredSavedMovies}
                onSearchMovies={handleSearchMovies}
                handleMovieDelete={handleMovieDelete}
                handleDelete={handleDelete}
                startPreloader={startPreloader}
                noSavedMoviesText={noSavedMoviesText}
                getMovieError={getMovieError}
              />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register
                handleInfoTooltip={handleInfoTooltip}
                setIsSuccsess={setIsSuccsess}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                handleLogin={handleLogin}
                handleInfoTooltip={handleInfoTooltip}
                setIsSuccsess={setIsSuccsess}
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
          />
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
