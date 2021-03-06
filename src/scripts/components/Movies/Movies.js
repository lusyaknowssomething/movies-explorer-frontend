import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  likedMovies,
  onSearchMovies,
  handleMovieLike,
  handleMovieDelete,
  startPreloader,
  noMoviesText,
  getMovieError,
  isLoading,
}) {

  const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
  const [filterDuration, setFilterDuration] = React.useState(false);

  React.useEffect(() => {
    const filterDurationMovies = localStorage.getItem("filterDurationMovies");
    if (filterDurationMovies === 'true') {
      setFilterDuration(true);
    }
  }, []);

  const handleFilterDuration = (moviesData) =>
    moviesData.filter((i) => i.duration <= 40);

  const onFilter = () => {
    setFilterDuration(!filterDuration);
    localStorage.setItem("filterDurationMovies", !filterDuration);
  };

  const handleSearchMovies = (query, isSavedMovies) => {
    onSearchMovies(query, isSavedMovies);
  };

  let main;

  if (startPreloader) {
    main = <Preloader />;
  } else if (getMovieError) {
    main = <div>{getMovieError}</div>;
  } else if (filteredMovies){
    main = !noMoviesText ? (
      <MoviesCardList
        moviesData={filterDuration === true ? handleFilterDuration(filteredMovies) : filteredMovies}
        likedMovies={likedMovies}
        handleMovieLike={handleMovieLike}
        handleMovieDelete={handleMovieDelete}
      />
    ) : (
      <div className="movies__not-found">{noMoviesText}</div>
    );
  }

  return (
    <div className="container">
      <Header />
      <main className="movies page__movies">
        <SearchForm
          onSearchMovies={handleSearchMovies}
          onFilter={onFilter}
          filterDuration={filterDuration}
          isLoading={isLoading}
        />
        {main}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
