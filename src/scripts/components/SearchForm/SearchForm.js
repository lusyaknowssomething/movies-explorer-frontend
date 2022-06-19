import React from "react";
import "./SearchForm.css";
import FindSvg from "../../../images/find.svg";
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearchMovies }) {
  const [state, setState] = React.useState({
    query: "",
  });

  const location = useLocation();
  const isSavedMovies = ['/saved-movies'].includes(location.pathname);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { query } = state;
    if(!query) return;
    onSearchMovies(query, isSavedMovies);
    setState({query: ""});
  };


  return (
    <section className="search page__search">
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          placeholder="Фильм"
          required
          name="query"
          value={state.query}
          onChange={handleChange}
        />
        <button className="search__button" type="submit">
          <img className="search__icon" src={FindSvg} alt="find-icon" />
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
}

export default SearchForm;
