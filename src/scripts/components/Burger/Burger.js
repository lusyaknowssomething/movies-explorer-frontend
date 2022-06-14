import React from "react";
import { NavLink } from "react-router-dom";
import "./Burger.css";
import CloseSvg from "../../../images/close.svg";

function Burger({ isBurgerOpen, handleBurgerOpen }) {
  return (
    <div className={`burger-menu ${isBurgerOpen && "burger-menu_open"}`}>
      <button
        className="burger-menu__close-btn"
        type="button"
        onClick={handleBurgerOpen}
      >
        <img className="burger-menu__icon" src={CloseSvg} alt="close-icon" />
      </button>
      <nav className="burger-menu__list">
        <NavLink
          to="/"
          exact
          className="burger-menu__link"
          activeClassName="burger-menu__link_active"
        >
          Главная
        </NavLink>
        <NavLink
          to="/movies"
          className="burger-menu__link"
          activeClassName="burger-menu__link_active"
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="burger-menu__link"
          activeClassName="burger-menu__link_active"
        >
          Сохранённые фильмы
        </NavLink>
      </nav>
      <NavLink
        to="/profile"
        className="burger-menu__profile"
      >
        Аккаунт
      </NavLink>
    </div>
  );
}

export default Burger;
