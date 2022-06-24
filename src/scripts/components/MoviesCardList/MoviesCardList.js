import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  moviesData,
  likedMovies,
  handleMovieLike,
  handleMovieDelete,
}) {
  const [movies, setMovies] = React.useState([]);
  const [moviesOnPage, setMoviesOnPage] = React.useState(null);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [time, setTime] = React.useState(0);

  const resizeHandler = () => {
    clearTimeout(time);
    setTime(setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 1000));
  }

  React.useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    if (windowWidth > 768) {
      setMoviesOnPage(12);
    } else if (windowWidth > 400) {
      setMoviesOnPage(8);
    } else {
      setMoviesOnPage(5);
    }

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [windowWidth]);

  function handleMoreBtn() {
    if (windowWidth > 768) {
      setMoviesOnPage(moviesOnPage + 3);
    } else if (windowWidth > 400) {
      setMoviesOnPage(moviesOnPage + 2);
    } else {
      setMoviesOnPage(moviesOnPage + 2);
    }
  }

  React.useEffect(() => {
    setMovies(moviesData.slice(0, moviesOnPage));
  }, [moviesData, moviesOnPage]);

  const moviesCards = movies.map((item) => (
    <MoviesCard
      item={item}
      likedMovies={likedMovies}
      handleMovieLike={handleMovieLike}
      handleMovieDelete={handleMovieDelete}
    />
  ));

  return (
    <section className="cards-list" aria-label="Блок с карточками">
      <div className="cards-list__container">{moviesCards}</div>
      {moviesData.length > moviesOnPage ? (<button type="button" className="cards-list__btn" onClick={handleMoreBtn}>
        Ещё
      </button>) : (
        <></>
      )}
    </section>
  );
}

export default MoviesCardList;
