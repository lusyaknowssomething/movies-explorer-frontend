import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import AppContext from "../../../contexts/AppContext";
import './App.css'
//import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  //const history = useHistory();
  //const [currentUser, setCurrentUser] = React.useState([]);
  const [loggining, setLoggining] = React.useState({ loggedIn: true});
  //const [email, setEmail] = React.useState('myemail@yandex.ru');
  //const [name, setName] = React.useState('Lyudmila');

  return (
    <CurrentUserContext.Provider>
      <AppContext.Provider>
        <div className="page">
          <Header />
          <Switch>
            <Route path="/movies">
              <Main />
            </Route>
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
          <Footer />
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;
