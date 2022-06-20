import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({
  item,
  likedMovies,
  handleMovieLike,
  onMovieDelete,
  onDelete,
}) {
  const {
    id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    isLiked,
  } = item;

  // Определяем, сохранена ли карточка
  const isSaved = (movie) => {
    console.log(likedMovies);
    likedMovies.some((item) => item.id === movie.id);
  };

  // Создаём переменную, которую зададим в `className` для кнопки сохранить
  const cardLikeButtonClassName = `element__btn ${
    isSaved ? "element__btn_active" : ""
  }`;

  const location = useLocation();
  const savedMoviesPath = ["/saved-movies"].includes(location.pathname);

  function onMovieLike() {
    handleMovieLike(item);
  }

  function onDeleteClick() {
    onDelete();
    onMovieDelete(item);
  }

  return (
    <article className="element">
      <h2 className="element__title">{nameRU}</h2>
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
        <img src={image} alt={nameRU} className="element__picture" />
      </div>
    </article>
  );
}

export default MoviesCard;
