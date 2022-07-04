import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/validation";

function Profile({ onUpdateUser, signOut, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [formIsValid, setFormIsValid] = React.useState(true);

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormWithValidation();

  React.useEffect(() => {
    if (
      (currentUser.name === values.name &&
        currentUser.email === values.email) ||
      (currentUser.name === values.name && values.email === undefined) ||
      (currentUser.email === values.email && values.name === undefined)
    ) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [currentUser, values]);

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

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
                disabled={isLoading}
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
                pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
                minLength="4"
                maxLength="40"
                onChange={handleChange}
                required
                disabled={isLoading}
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
              <button
                className="profile__button"
                type="submit"
                disabled={!isValid || !formIsValid}
              >
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
