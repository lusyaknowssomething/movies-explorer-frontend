import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/validation";

function Profile({ onUpdateUser, signOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  // const [state, setState] = React.useState({
  //   name: currentUser.name,
  //   email: currentUser.email,
  // });

  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  }

  return (
    <>
      <Header />
      <main className="profile page__profile">
        <section className="profile__section">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit} noValidate>
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                name="name"
                type="text"
                minLength="1"
                maxLength="40"
                onChange={handleChange}
                pattern="^[a-zA-Zа-яёА-ЯЁ\s\-]+$"
                required
                defaultValue={currentUser.name}
              />
            </label>
            <span
                className={`${
                  errors.name
                    ? "profile__error_type_active"
                    : "profile__error_type_hidden"
                }`}
              >
                {errors.name}
              </span>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                name="email"
                type="email"
                defaultValue={currentUser.email}
                minLength="4"
                maxLength="40"
                onChange={handleChange}
                required
              />
            </label>
            <span
                className={`${
                  errors.email
                    ? "profile__error_type_active"
                    : "profile__error_type_hidden"
                }`}
              >
                {errors.email}
              </span>
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
