import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function MoviesCard({
  item,
  likedMovies,
  handleMovieLike,
  handleMovieDelete,
  handleDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const {
    movieId,
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

  let isSaved;
  const location = useLocation();
  const savedMoviesPath = ["/saved-movies"].includes(location.pathname);
  const moviesPath = ["/movies"].includes(location.pathname);

  if (moviesPath) {
    // Определяем, сохранена ли карточка
    isSaved = likedMovies.some((i) => Number(i.movieId) === movieId);
  }

  // Создаём переменную, которую зададим в `className` для кнопки сохранить
  const cardLikeButtonClassName = `element__btn ${
    isSaved ? "element__btn_active" : ""
  }`;

  function onMovieLike() {
    handleMovieLike(item);
  }

  function onDeleteClick() {
    handleDelete();
    handleMovieDelete(item);
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
