import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  savedMovies,
  filteredSavedMovies,
  onSearchMovies,
  handleMovieDelete,
  startPreloader,
  noSavedMoviesText,
  getMovieError,
}) {
  const [filterDuration, setFilterDuration] = React.useState(false);

  const handleFilterDuration = (movies) =>
    movies.filter((i) => i.duration <= 40);

  const onFilter = () => {
    setFilterDuration(!filterDuration);
  };

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
            ? handleFilterDuration(
                filteredSavedMovies.length > 0
                  ? filteredSavedMovies
                  : savedMovies
              )
            : filteredSavedMovies.length > 0
            ? filteredSavedMovies
            : savedMovies
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
        <SearchForm
          onSearchMovies={onSearchMovies}
          onFilter={onFilter}
        />
        {main}
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
