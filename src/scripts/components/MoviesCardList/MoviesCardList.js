import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ moviesData }) {

  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    setMovies(moviesData);
    console.log(moviesData)
  }, [moviesData]);

  const moviesCards = movies.map((item) => (
    <MoviesCard item={item} />
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
