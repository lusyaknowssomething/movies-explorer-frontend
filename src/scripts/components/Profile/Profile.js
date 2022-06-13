import React from "react";
import Header from "../Header/Header";
import "./Profile.css";

function Profile({ email, name }) {
  const [state, setState] = React.useState({
    name: name,
    email: email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };
  return (
    <>
      <Header />
      <main className="profile page__profile">
        <section className="profile__section" aria-label="Блок с карточками">
          <h1 className="profile__title">{`Привет, ${name}!`}</h1>
          <form className="profile__form">
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                placeholder="Name"
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
                placeholder="Email"
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
