import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import { useHistory } from "react-router-dom";
import AppContext from "../../../contexts/AppContext";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function Profile({ onUpdateUser }) {
  const history = useHistory();
  const value = React.useContext(AppContext);
  const currentUser = React.useContext(CurrentUserContext);

  const [state, setState] = React.useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };


  function signOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    history.push('/sign-in');
    value.loggedIn = false;
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: state.name,
      email: state.email,
    });
  }

  return (
    <>
      <Header />
      <main className="profile page__profile">
        <section className="profile__section">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                name="name"
                type="text"
                value={state.name}
                onChange={handleChange}
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                name="email"
                type="email"
                value={state.email}
                onChange={handleChange}
              />
            </label>
            <div className="profile__btn-container">
              <button className="profile__button" type="submit">
                Редактировать
              </button>
              <button
                className="profile__button profile__button_exit"
                type="button"
                onClick={signOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
