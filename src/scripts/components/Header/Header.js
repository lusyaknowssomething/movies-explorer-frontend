import logo from "../../../images/logo.svg";
import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
  //const history = useHistory();

  return (
    <header className="header page__header">
      <Link className="header__link" to="/">
        <img src={logo} alt="Логотип проекта" className="header__logo" />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
