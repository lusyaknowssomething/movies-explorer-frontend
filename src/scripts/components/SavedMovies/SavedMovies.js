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
  isLoading,
}) {

  const [filterDuration, setFilterDuration] = React.useState(false);
  // const [filteredMovies, setFilteredMovies] = React.useState(null);
  React.useEffect(() => {
    filteredSavedMovies.length = 0;
  }, []);

  // React.useEffect(() => {
  //   setFilteredMovies(null);
  //   console.log(savedMovies);
  //   const filterDurationSavedMovies = localStorage.getItem("filterDurationSavedMovies");
  //   if (filterDurationSavedMovies) {
  //     setFilterDuration(filterDurationSavedMovies)
  //   }
  // }, []);

  const handleFilterDuration = (moviesData) =>
    moviesData.filter((i) => i.duration <= 40);

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
        <SearchForm onSearchMovies={handleSearchMovies} onFilter={onFilter} filterDuration={filterDuration} isLoading={isLoading}/>
        {main}
      </main>
      <Footer />
    </div>
  );
}

export default SavedMovies;
