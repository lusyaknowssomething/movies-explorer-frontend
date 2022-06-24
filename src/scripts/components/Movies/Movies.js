import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  movies,
  likedMovies,
  onSearchMovies,
  handleMovieLike,
  handleMovieDelete,
  startPreloader,
  noMoviesText,
  getMovieError,
}) {

  const filterDurationMovies = localStorage.getItem("filterDurationMovies");

  const [filterDuration, setFilterDuration] = React.useState(false);

  React.useEffect(() => {
    if (filterDurationMovies) {
      setFilterDuration(filterDurationMovies)
    }
  }, []);

  const handleFilterDuration = (movies) => movies.filter((i) => i.duration <= 40);

  const onFilter = () => {
    setFilterDuration(!filterDuration);
    localStorage.setItem('filterDurationMovies', !filterDuration);
  };

  let main

  if (startPreloader) {
    main = <Preloader />
  } else if (getMovieError) {
    main = <div>
    {getMovieError}
  </div>
  } else {
    main = !noMoviesText ? (
      <MoviesCardList
        moviesData={filterDuration ? handleFilterDuration(movies) : movies}
        likedMovies={likedMovies}
        handleMovieLike={handleMovieLike}
        handleMovieDelete={handleMovieDelete}
      />
    ) : (
      <div className="movies__not-found">{noMoviesText}</div>
    )
  }

  return (
    <div className="container">
      <Header />
      <main className="movies page__movies">
        <SearchForm onSearchMovies={onSearchMovies} onFilter={onFilter} filterDuration={filterDuration}/>
        {main}
      </main>
      <Footer />
    </div>
  );
}

export default Movies;
