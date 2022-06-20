import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ moviesData, likedMovies, handleMovieLike, handleMovieDelete, handleDelete }) {

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    setMovies(moviesData);
    console.log(moviesData)
  }, [moviesData]);

  const moviesCards = movies.map((item) => (
    <MoviesCard
      item={item}
      likedMovies={likedMovies}
      handleMovieLike={handleMovieLike}
      handleMovieDelete={handleMovieDelete}
      handleDelete={handleDelete}
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
