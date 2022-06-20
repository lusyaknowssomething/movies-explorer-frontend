import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ moviesData, likedMovies, handleMovieLike, onMovieDelete, onDelete }) {

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    setMovies(moviesData);
  }, [moviesData]);

  const moviesCards = movies.map((item) => (
    <MoviesCard
      item={item}
      likedMovies={likedMovies}
      handleMovieLike={handleMovieLike}
      onMovieDelete={onMovieDelete}
      onDelete={onDelete}
    />
  ));

  return (
    <section className="cards-list" aria-label="Блок с карточками">
      <div className="cards-list__container">
        {moviesCards}
      </div>
    </section>
  );
};

export default MoviesCardList;
