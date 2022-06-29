import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";
import { DURATION } from "../../utils/constants";

function SavedMovies({
  savedMovies,
  filteredSavedMovies,
  onSearchMovies,
  handleMovieDelete,
  startPreloader,
  noSavedMoviesText,
  getMovieError,
  isLoading,
}) {

  const [filterDuration, setFilterDuration] = React.useState(false);
  const [moviesOnPage, setMoviesOnPage] = React.useState([]);
  React.useEffect(() => {
    filteredSavedMovies.length = 0;
    setMoviesOnPage(savedMovies);
  }, []);


  React.useEffect(() => {
    setMoviesOnPage(filteredSavedMovies.length > 0
      ? filteredSavedMovies
      : savedMovies)
  }, [filterDuration, filteredSavedMovies, savedMovies]);

  const handleFilterDuration = (moviesData) =>
    moviesData.filter((i) => i.duration <= DURATION);

  const onFilter = () => {
    setFilterDuration(!filterDuration);
  };

  const handleSearchMovies = (query, isSavedMovies) => {
    onSearchMovies(query, isSavedMovies);
  }

  let main;

  if (startPreloader) {
    main = <Preloader />;
  } else if (getMovieError) {
    main = <div>{getMovieError}</div>;
  } else {
    main = !noSavedMoviesText ? (
      <MoviesCardList
        moviesData={
          filterDuration
            ? handleFilterDuration(moviesOnPage)
            : moviesOnPage
        }
        handleMovieDelete={handleMovieDelete}
      />
    ) : (
      <div className="movies__not-found">{noSavedMoviesText}</div>
    );
  }

  return (
    <div className="container">
      <Header />
      <main className="saved-movies page__saved-movies">
        <SearchForm onSearchMovies={handleSearchMovies} onFilter={onFilter} filterDuration={filterDuration} isLoading={isLoading}/>
        {main}
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
