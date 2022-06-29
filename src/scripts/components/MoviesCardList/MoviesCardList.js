import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import {
  TABLET_WIDTH,
  MOBILE_WIDTH,
  EXTRA_MOVIES_FOR_DESCTOP,
  EXTRA_MOVIES_FOR_TABLET_AND_MOBILE,
  MOVIES_ON_PAGE_FOR_DESCTOP,
  MOVIES_ON_PAGE_FOR_TABLET,
  MOVIES_ON_PAGE_FOR_MOBILE,
} from "../../utils/constants";

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
    setTime(
      setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 1000)
    );
  };

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    if (windowWidth > TABLET_WIDTH) {
      setMoviesOnPage(MOVIES_ON_PAGE_FOR_DESCTOP);
    } else if (windowWidth > MOBILE_WIDTH) {
      setMoviesOnPage(MOVIES_ON_PAGE_FOR_TABLET);
    } else {
      setMoviesOnPage(MOVIES_ON_PAGE_FOR_MOBILE);
    }

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [windowWidth]);

  function handleMoreBtn() {
    if (windowWidth > TABLET_WIDTH) {
      setMoviesOnPage(moviesOnPage + EXTRA_MOVIES_FOR_DESCTOP);
    } else if (windowWidth > MOBILE_WIDTH) {
      setMoviesOnPage(moviesOnPage + EXTRA_MOVIES_FOR_TABLET_AND_MOBILE);
    } else {
      setMoviesOnPage(moviesOnPage + EXTRA_MOVIES_FOR_TABLET_AND_MOBILE);
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
      {moviesData.length > moviesOnPage ? (
        <button
          type="button"
          className="cards-list__btn"
          onClick={handleMoreBtn}
        >
          Ещё
        </button>
      ) : (
        <></>
      )}
    </section>
  );
}

export default MoviesCardList;
