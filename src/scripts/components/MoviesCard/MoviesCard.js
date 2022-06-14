import React from "react";
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ name, time, img}) {
  // Определяем, сохранена ли карточка
  const isSaved = true;

  // Создаём переменную, которую зададим в `className` для кнопки сохранить
  const cardLikeButtonClassName = `element__btn ${
    isSaved ? "element__btn_active" : ""
  }`;

  const location = useLocation();
  const savedMoviesPath = ['/saved-movies'].includes(location.pathname);

  return (
    <article className="element">
      <h2 className="element__title">{name}</h2>
      <p className="element__time">{time}</p>
      {savedMoviesPath ? (
        <button
          type="button"
          className="element__btn element__btn_delete"
        >
        </button>
      ) : (
        <button
          type="button"
          className={cardLikeButtonClassName}
        >
        </button>
      )}
      <div className="element__pic-container">
        <img
          src={img}
          alt={name}
          className="element__picture"
        />
      </div>
    </article>
  );
};

export default MoviesCard;
