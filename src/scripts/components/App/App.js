import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AppContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState([]);
  const [loggining, setLoggining] = React.useState({ loggedIn: false});
  const [email, setEmail] = React.useState(null);
  const [name, setName] = React.useState(null);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value={{loggedIn: loggining.loggedIn, email: email}}>
        <div className="page">
          <Header />
          <Switch>
          <ProtectedRoute path="/cards" >
            <Main />
          </ProtectedRoute>
            <Route path="/sign-up">
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login />
            </Route>
            <Route exact path="/">
              {loggining.loggedIn ? <Redirect to="/movies" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
