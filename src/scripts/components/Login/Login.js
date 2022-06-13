import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../images/logo.svg";

function Login() {
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
        <h1 className="register__title">Рады видеть!</h1>
        <form className="register__form register__form_type_login">
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
              Войти
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
