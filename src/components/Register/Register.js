import { Link } from "react-router-dom";
import "../Register/Register.css";
import React from "react";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../utils/Validation";

function Register({ onRegister, isLoading }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <main>
      <section className="register">
        <Link to="/">
          <img className="register__logo" alt="логотип" src={logo} />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <fieldset className="register__inputs">
            <div className="register__field-input">
              <label className="register__name-input">Имя</label>
              <input
                className="register__input"
                type="name"
                name="name"
                placeholder="Введите имя"
                minLength="2"
                maxLength="40"
                required
                value={values.name || ""}
                onChange={handleChange}
              />
            </div>
            <p className="register__error-text">{errors.name}</p>
            <div className="register__field-input">
              <label className="register__name-input">E-mail</label>
              <input
                className="register__input"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={values.email || ""}
              />
            </div>
            <p className="register__error-text">{errors.email}</p>
            <div className="register__field-input">
              <label className="register__name-input">Пароль</label>
              <input
                className="register__input"
                type="password"
                name="password"
                placeholder="Введите пароль"
                minLength="8"
                maxLength="40"
                required
                value={values.password || ""}
                onChange={handleChange}
              />
            </div>
            <p className="register__error-text">{errors.password}</p>
          </fieldset>
          <button
            className={`register__button-submit ${
              isValid && !isLoading ? "" : "register__button-submit_disabled"
            }`}
            type="submit"
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="register__footer">
          <p className="register__footer-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__footer-link">
            Войти
          </Link>
        </div>
      </section>
    </main>
  );
}
export default Register;
