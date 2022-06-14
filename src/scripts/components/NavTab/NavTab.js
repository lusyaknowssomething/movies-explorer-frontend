import React from "react";
import "./NavTab.css";

function NavTab() {

  return (
    <nav className="nav-tab">
      <ul className="nav-tab__list">
        <li className="nav-tab__item">
          <a className="nav-tab__link" href="#about">
            О проекте
          </a>
        </li>
        <li className="nav-tab__item">
          <a className="nav-tab__link" href="#techs">
            Технологии
          </a>
        </li>
        <li className="nav-tab__item">
          <a className="nav-tab__link" href="#student">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
