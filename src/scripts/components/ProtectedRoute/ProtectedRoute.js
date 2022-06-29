import React from 'react';
import { Redirect } from "react-router-dom";
import AppContext from "../../../contexts/AppContext";

const ProtectedRoute = ({ children  }) => {
  const value = React.useContext(AppContext);
  return value.loggedIn
  ? children
  : <Redirect to="./" />
}

export default ProtectedRoute;
