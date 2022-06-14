import React from "react";
import "./NotFound.css";
import { useHistory } from 'react-router-dom';

function NotFound() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <main className="not-found">
      <div className="not-found__container">
        <h3 className="not-found__title">404</h3>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button className="not-found__btn" onClick={handleGoBack}>
        Назад
      </button>
    </main>
  );
};

export default NotFound;
