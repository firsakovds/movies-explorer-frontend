import { Link } from "react-router-dom";
import "../Register/Register.css"
import React from "react";
import logo from "../../images/logo.svg"
function Register() {
  return (
    <main>
      <section className="register">
        <Link to="/">
          <img className="register__logo" alt="логотип" src={logo} />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form">
          <fieldset className="register__inputs">
            <div className="register__field-input">
              <label className="register__name-input">Имя</label>
              <input className="register__input" type="name" id="name" placeholder="Введите имя" defaultValue="Виталий" minLength="2" maxLength="40" required />
            </div>
            <div className="register__field-input">
              <label className="register__name-input">E-mail</label>
              <input className="register__input" type="email" id="email" placeholder="Введите почту" defaultValue="pochta@yandex.ru" minLength="2" maxLength="40" required />
            </div>
            <div className="register__field-input">
              <label className="register__name-input">Пароль</label>
              <input className="register__input" type="password" id="password" placeholder="Введите пароль" defaultValue="***************" minLength="2" maxLength="40" required />
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
    </main>
  )
}
export default Register;