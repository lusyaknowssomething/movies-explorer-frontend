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
//import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  //const history = useHistory();
  //const [currentUser, setCurrentUser] = React.useState([]);
  const [loggining, setLoggining] = React.useState({ loggedIn: false});
  const [email, setEmail] = React.useState('myemail@yandex.ru');
  const [name, setName] = React.useState('Людмила');

  return (
    <CurrentUserContext.Provider>
      <AppContext.Provider value={{loggedIn: loggining.loggedIn}}>
        <div className="page">
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/profile">
              <Profile email={email} name={name} />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
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
