import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../images/logo.svg";
import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import { useFormWithValidation } from "../../utils/validation";

function Login({ handleLogin, handleInfoTooltip, setIsSuccsess }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .authorize(values.password, values.email)
      .then((data) => {
        if (!data.token){
          handleInfoTooltip(true, false);
          setIsSuccsess(false)
          return;
        }
        return data.token;
      })
      .then((token) => {
        mainApi
          .getUserData(token)
            .then((data) => {
              handleLogin(token, data);
            })
      })
      .catch((err) => {
        handleInfoTooltip(true, false);
        setIsSuccsess(false);
        console.log(err);
      });
  };

  return (
    <main className="register page__register">
      <section className="register__section">
        <Link to="/" className="register__main-link">
          <img className="register__logo" src={Logo} alt="logo icon" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
        <form
          className="register__form register__form_type_login"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="register__label">
            E-mail
            <input
              className="register__input"
              name="email"
              type="email"
              minLength="4"
              maxLength="40"
              onChange={handleChange}
              pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              required
            />
            <span
              className={`${
                errors.email
                  ? "register__error_type_active"
                  : "register__error_type_hidden"
              }`}
            >
              {errors.email}
            </span>
          </label>
          <label className="register__label">
            Пароль
            <input
              className="register__input"
              name="password"
              type="password"
              minLength="6"
              maxLength="30"
              onChange={handleChange}
              pattern="((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              required
            />
            <span
              className={`${
                errors.password
                  ? "register__error_type_active"
                  : "register__error_type_password"
              }`}
            >
              {errors.password
                ? errors.password
                : "Строчные и прописные латинские буквы, цифры, спецсимволы. Минимум 6 символов"}
            </span>
          </label>
          <div className="register__btn-container">
            <button
              className={`register__button ${
                !isValid && "register__button_disabled"
              }`}
              type="submit"
              disabled={!isValid}
            >
              Войти {isValid}
            </button>
            <div className="register__signin">
              <p className="register__text">Ещё не зарегистрированы?</p>
              <Link to="sign-up" className="register__login-link">
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Login;
