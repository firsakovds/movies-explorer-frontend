import { Link } from "react-router-dom";
import "../Register/Register.css";
import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
function Register({ onRegister, isLoading }) {
  const [userData, setUserData] = useState({
    name: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
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

  const isValid =
    userData.name.isValid &&
    userData.email.isValid &&
    userData.password.isValid;

  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    isValid ? setDisabled(false) : setDisabled(true);
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
    onRegister({
      name: userData.name.value,
      email: userData.email.value,
      password: userData.password.value,
    });
  };

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
                value={userData.name.value || ""}
                onChange={handleChange}
              />
            </div>
            <p className="register__error-text">{userData.name.errorMessage}</p>
            <div className="register__field-input">
              <label className="register__name-input">E-mail</label>
              <input
                className="register__input"
                type="email"
                name="email"
                placeholder="Введите почту"
                required
                value={userData.email.value || ""}
                onChange={handleChange}
              />
            </div>
            <p className="register__error-text">
              {userData.email.errorMessage}
            </p>
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
                value={userData.password.value || ""}
                onChange={handleChange}
              />
            </div>
            <p className="register__error-text">
              {userData.password.errorMessage}
            </p>
          </fieldset>
          <button
            className={`register__button-submit ${
              isValid && !isLoading ? "" : "register__button-submit_disabled"
            }`}
            type="submit"
            disabled={disabled}
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
