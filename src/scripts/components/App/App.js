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

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loggining, setLoggining] = React.useState({ loggedIn: false });
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = React.useState(false);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [getMovieError, setGetMovieError] = React.useState(null);
  const [startPreloader, setStartPreloader] = React.useState(false);

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
    setStartPreloader(true);
    mainApi
      .getMovies()
      .then((movies) => {
        const savedMoviesData = movies.data.map((item) => {
          return { ...item };
        });
        setSavedMovies(savedMoviesData);
        localStorage.setItem("savedMovies", JSON.stringify(savedMoviesData));
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
        //localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
        setFilteredMovies(filteredMovies);
      } else {
        console.log("Im here");
        const filteredSavedMovies = handleSearchFilter(
          searchQuery,
          savedMoviesDataFromStorage
        );
        console.log(filteredSavedMovies);
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
    mainApi
      .patchUserData(data)
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

  function handleInfoTooltip(historyPush, register) {
    if (historyPush) {
      history.push("/sign-in");
    }
    if (register) {
      setLoggining(false);
    }
  }

  const handleMovieDelete = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then((res) => {
        if (res) {
          setSavedMovies(savedMovies.filter((i) => i.movieId !== res.data.movieId));
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleMovieLike(movie) {
    console.log(movie);
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = savedMovies.some((item) => item.id === movie.id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    console.log(isLiked);
    if (isLiked) {
      mainApi
        .postMovie(movie)
        .then((movie) => {
          setSavedMovies([...savedMovies, movie.data]);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      mainApi
        .deleteMovie(movie._id)
        .then((res) => {
          if (res) {
            setSavedMovies(savedMovies.filter((i) => i.movieId !== res.data.movieId));
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
              />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile onUpdateUser={handleUpdateUser} signOut={signOut} />
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies">
              <SavedMovies
                savedMovies={savedMovies}
                onSearchMovies={handleSearchMovies}
                handleMovieDelete={handleMovieDelete}
                handleDelete={handleDelete}
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
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
