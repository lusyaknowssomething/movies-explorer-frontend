import React from "react";
import AppContext from "../../../contexts/AppContext";
import { Link } from "react-router-dom";
import Burger from "../Burger/Burger";
import "./Navigation.css";
import BurgerSvg from "../../../images/burger.svg";

function Navigation() {
  const value = React.useContext(AppContext);
  const [isBurgerOpen, setIsBurgerOpen] = React.useState(false);
  const handleBurgerOpen = () => setIsBurgerOpen(!isBurgerOpen);

  return (
    <>
      {value.loggedIn ? (
        <>
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
            <button
              className="navigation__burger-btn"
              type="button"
              onClick={handleBurgerOpen}
            >
              <img className="navigation__burger-icon" src={BurgerSvg} alt="burger-icon"/>
            </button>
          </div>
          <Burger isBurgerOpen={isBurgerOpen} handleBurgerOpen={handleBurgerOpen}/>
        </>
      ) : (
        <div className="navigation navigation_type_logged-out">
          <div className="navigation__auth">
            <Link className="navigation__auth-link" to="/sign-up">
              Регистрация
            </Link>
            <Link
              className="navigation__auth-link navigation__auth-link_btn"
              to="/sign-in"
            >
              Войти
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
