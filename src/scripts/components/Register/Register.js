import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import Logo from "../../../images/logo.svg"

function Register() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  };

  return (
    <main className="register page__register">
      <section className="register__section">
        <Link to="/" className="register__main-link">
          <img className="register__logo" src={Logo} alt="logo icon" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form register__form_type_register">
          <label className="register__label">
            Имя
            <input
              className="register__input"
              name="name"
              type="text"
              value={state.name}
              onChange={handleChange}
            />
          </label>
          <label className="register__label">
            E-mail
            <input
              className="register__input"
              name="email"
              type="email"
              value={state.email}
              onChange={handleChange}
            />
          </label>
          <label className="register__label">
            Пароль
            <input
              className="register__input"
              name="password"
              type="password"
              value={state.password}
              onChange={handleChange}
            />
          </label>
          <div className="register__btn-container">
            <button className="register__button" type="submit">
              Зарегистрироваться
            </button>
            <div className="register__signin">
              <p className="register__text">Уже зарегистрированы?</p>
              <Link to="sign-in" className="register__login-link">
                Войти
              </Link>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Register;
