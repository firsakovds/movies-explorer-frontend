import "../Login/Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import React from "react";
import { useFormWithValidation } from "../../utils/Validation";

function Login({ onLogin, isLoading }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <main>
      <section className="login">
        <Link to="/">
          <img className="login__logo" alt="логотип" src={logo} />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <fieldset className="login__inputs">
            <div className="login__field-input">
              <label className="login__name-input">E-mail</label>
              <input
                className="login__input"
                type="email"
                name="email"
                placeholder="Введите почту"
                value={values.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <p className="login__error-text">{errors.email}</p>
            <div className="login__field-input">
              <label className="login__name-input">Пароль</label>
              <input
                className="login__input"
                type="password"
                name="password"
                placeholder="Введите пароль"
                minLength="8"
                maxLength="40"
                value={values.password || ""}
                onChange={handleChange}
                required
              />
            </div>
            <p className="login__error-text">{errors.password}</p>
          </fieldset>
          <button
            className={`login__button-submit ${
              isValid && !isLoading ? "" : "login__button-submit_disabled"
            }`}
            type="submit"
            disabled={!isValid}
          >
            Войти
          </button>
        </form>
        <div className="login__footer">
          <p className="login__footer-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__footer-link">
            Регистрация
          </Link>
        </div>
      </section>
    </main>
  );
}
export default Login;
