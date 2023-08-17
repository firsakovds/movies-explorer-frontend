import { Link } from "react-router-dom";
import "../Register/Register.css"
import React from "react";
import logo from "../../images/logo.svg"
function Register() {
  return (
    <section className="register">
      <Link to="/">
        <img className="register__logo" alt="логотип" src={logo} />
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <fieldset className="register__inputs">
          <div className="register__field-input">
            <p className="register__name-input">Имя</p>
            <input className="register__input" type="name" id="name" value="Виталий" minLength="2" maxLength="40" required readOnly/>
          </div>
          <div className="register__field-input">
            <p className="register__name-input">E-mail</p>
            <input className="register__input" type="email" id="email" value="pochta@yandex.ru" minLength="2" maxLength="40" required readOnly/>
          </div>
          <div className="register__field-input">
            <p className="register__name-input">Пароль</p>
            <input className="register__input" type="password" id="password" value="***************" minLength="2" maxLength="40" required readOnly/>
          </div>
          <p className="register__error-text">Что-то пошло не так...</p>
        </fieldset>
        <button className="register__button-submit" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__footer">
        <p className="register__footer-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__footer-link">Войти</Link>
      </div>
    </section>
  )
}
export default Register;