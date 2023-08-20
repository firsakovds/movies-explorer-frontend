import "../Login/Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import React, { useEffect, useState } from "react";
function Login({ onLogin, isLoading }) {
  const [userData, setUserData] = useState({
    email: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    password: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  });

  const isValid = userData.email.isValid && userData.password.isValid;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    isValid ? setDisabled(false) : setDisabled(false);
  }, [isValid]);
  useEffect(() => {
    isLoading ? setDisabled(true) : setDisabled(false);
  }, [isLoading]);

  const handleChange = (evt) => {
    const { name, value, validity, validationMessage } = evt.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: {
        ...userData[name],
        value,
        isValid: validity.valid,
        errorMessage: validationMessage,
      },
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({
      email: userData.email.value,
      password: userData.password.value,
    });
    setUserData({ email: "", password: "" });
  };

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
                value={userData.email.value || ""}
                onChange={handleChange}
                required
              />
            </div>
            <p className="login__error-text">{userData.email.errorMessage}</p>
            <div className="login__field-input">
              <label className="login__name-input">Пароль</label>
              <input
                className="login__input"
                type="password"
                name="password"
                placeholder="Введите пароль"
                minLength="8"
                maxLength="40"
                value={userData.password.value || ""}
                onChange={handleChange}
                required
              />
            </div>
            <p className="login__error-text">
              {userData.password.errorMessage}
            </p>
          </fieldset>
          <button
            className={`login__button-submit ${
              isValid && !isLoading ? "" : "login__button-submit_disabled"
            }`}
            type="submit"
            disabled={disabled}
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
