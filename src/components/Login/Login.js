import "../Login/Login.css"
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import React from "react"
function Login() {
  return (
    <main>
      <section className="login">
        <Link to="/">
          <img className="login__logo" alt="логотип" src={logo} />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form">
          <fieldset className="login__inputs">
            <div className="login__field-input">
              <label className="login__name-input">E-mail</label>
              <input className="login__input" type="email" id="email" value="pochta@yandex.ru" minLength="2" maxLength="40" required readOnly />
            </div>
            <div className="login__field-input">
              <label className="login__name-input">Пароль</label>
              <input className="login__input" type="password" id="password" value="" minLength="2" maxLength="40" required readOnly />
            </div>
            <p className="login__error-text">Что-то пошло не так...</p>
          </fieldset>
          <button className="login__button-submit" type="submit">Войти</button>
        </form>
        <div className="login__footer">
          <p className="login__footer-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__footer-link">Регистрация</Link>
        </div>
      </section>
    </main>
  )
}
export default Login;