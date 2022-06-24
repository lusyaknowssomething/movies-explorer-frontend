import React from "react";
import "./SearchForm.css";
import FindSvg from "../../../images/find.svg";
import { useLocation } from 'react-router-dom';

function SearchForm({ onSearchMovies, onFilter, filterDuration }) {
  const [query, setQuery] = React.useState('');

  const searchQuery = localStorage.getItem("searchQuery");

  React.useEffect(() => {
    if (searchQuery && location.pathname === "/movies") {
      setQuery(searchQuery);
      const filterDurationFromStorage= localStorage.getItem('filterDurationMovies')
    }
  }, []);

  const location = useLocation();
  const isSavedMovies = ['/saved-movies'].includes(location.pathname);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!query) return;
    onSearchMovies(query, isSavedMovies, filterDuration);
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
          value={query}
          onChange={handleChange}
        />
        <button className="search__button" type="submit">
          <img className="search__icon" src={FindSvg} alt="find-icon" />
        </button>
      </form>
      <div className="switcher">
        <input type="checkbox" checked={filterDuration} onClick={onFilter} id="switcher" className="switcher__checkbox" />
        <label for="switcher" className="switcher__button">
          <div className="switcher__circle"></div>
        </label>
        <p className="switcher__text">Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
