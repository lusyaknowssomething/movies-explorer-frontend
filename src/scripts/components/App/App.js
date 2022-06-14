import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import AppContext from "../../../contexts/AppContext";
import './App.css';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import * as auth from "../../utils/auth"

const App = () => {

  const [currentUser, setCurrentUser] = React.useState([]);
  const [movies, setMovies] = React.useState([]);
  const [loggining, setLoggining] = React.useState({ loggedIn: false});
  const token = localStorage.getItem('token');
  const [email, setEmail] = React.useState('myemail@yandex.ru');
  const [name, setName] = React.useState('Людмила');
  const [isLoading, setIsLoading] = React.useState(false);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (!token) return;
    auth
      .checkToken(token)
      .then((res) => {
        if (!res) return;
        setEmail(res.email);
        setName(res.name);
        setLoggining({
          loggedIn: true
        });
        //history.push("/cards");
      })
      .catch((res) => console.log(res));
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value={{loggedIn: loggining.loggedIn, email: email, name: name}}>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute path="/movies">
              <Movies />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile email={email} name={name} />
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies">
              <SavedMovies />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
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
