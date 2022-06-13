import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

function MoviesCardList({ moviesData }) {

  const moviesCards = moviesData.map((item) => (
    <MoviesCard name={item.name} time={item.time} img={item.img} />
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
