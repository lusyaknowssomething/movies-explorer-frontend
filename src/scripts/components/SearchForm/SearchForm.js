import React from "react";
import './SearchForm.css';
import FindSvg from "../../../images/find.svg";

function SearchForm() {

  return (
    <section className="search page__search">
      <form className="search__form">
        <input className="search__input" type="text" placeholder="Фильм" required />
        <button className="search__button">
          <img className="search__icon" src={FindSvg} alt="find-icon"/>
        </button>
      </form>
      <div className="switcher">
        <input type="checkbox" id="switcher" className="switcher__checkbox" />
        <label for="switcher" className="switcher__button">
          <div className="switcher__circle"></div>
        </label>
        <p className="switcher__text">Короткометражки</p>
      </div>
    </section>
  );
};

export default SearchForm;
