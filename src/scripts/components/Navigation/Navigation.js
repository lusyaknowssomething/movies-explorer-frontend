import React from "react";
import AppContext from "../../../contexts/AppContext";
import { Link } from "react-router-dom";
import "./Navigation.css"

function Navigation() {
  const value = React.useContext(AppContext);

  return (
    <>
      {value.loggedIn ? (
        <div className="navigation navigation_type_logged-in">
          <div className="navigation__movies">
            <Link className="navigation__link" to="/movies">
              Фильмы
            </Link>
            <Link className="navigation__link" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </div>
          <Link className="navigation__profile-btn" to="/profile">
            Аккаунт
          </Link>
        </div>
      ) : (
        <div className="navigation navigation_type_logged-out">
          <div className="navigation__auth">
            <Link className="navigation__auth-link" to="/sign-up">
              Регистрация
            </Link>
            <Link className="navigation__auth-link navigation__auth-link_btn" to="/sign-in">
              Войти
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
