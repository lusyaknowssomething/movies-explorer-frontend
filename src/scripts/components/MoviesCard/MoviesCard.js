import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({
  item,
  likedMovies,
  handleMovieLike,
  handleMovieDelete,
}) {

  const duration = `${Math.trunc(item.duration / 60)}ч ${item.duration % 60}м`;

  let isSaved;
  const location = useLocation();
  const savedMoviesPath = ["/saved-movies"].includes(location.pathname);
  const moviesPath = ["/movies"].includes(location.pathname);

  if (moviesPath) {
    // Определяем, сохранена ли карточка
    isSaved = likedMovies.some((i) => Number(i.movieId) === item.movieId);
  }

  // Создаём переменную, которую зададим в `className` для кнопки сохранить
  const cardLikeButtonClassName = `element__btn ${
    isSaved ? "element__btn_active" : ""
  }`;

  function onMovieLike() {
    handleMovieLike(item);
  }

  function onDeleteClick() {
    handleMovieDelete(item);
  }

  function openTrailer() {
    window.open(item.trailerLink);
  }

  return (
    <article className="element">
      <h2 className="element__title">{item.nameRU}</h2>
      <p className="element__time">{duration}</p>
      {savedMoviesPath ? (
        <button
          type="button"
          className="element__btn element__btn_delete"
          onClick={onDeleteClick}
        ></button>
      ) : (
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={onMovieLike}
        ></button>
      )}
      <div className="element__pic-container">
        <img src={item.image} alt={item.nameRU} className="element__picture" onClick={openTrailer} />
      </div>
    </article>
  );
}

export default MoviesCard;
