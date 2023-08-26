import "../Profile/Profile.css";
import React from "react";
import HeaderMovies from "../Header/HeaderMovies";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/Validation";

function Profile({ onUpdateUser, isLoading, onSignOut, isExit}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  React.useEffect(() => {
    resetForm(currentUser);
    values.name = currentUser.name;
    values.email = currentUser.email;
  }, [currentUser]);

  React.useEffect(() => {
    if (
      currentUser.name === values.name &&
      currentUser.email === values.email
    ) {
      setIsValid(false);
    }
  }, [values]);
  function twoClickButton() {
    onSignOut();
    isExit()
  }

  return (
    <div>
      <HeaderMovies />
      <main>
        <section className="profile">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <fieldset className="profile__inputs">
              <div className="profile__field-input">
                <p className="profile__name-input">Имя</p>
                <input
                  className="profile__input"
                  type="name"
                  name="name"
                  minLength="2"
                  maxLength="40"
                  required
                  value={values.name || ""}
                  onChange={handleChange}
                />
              </div>
              <p className="profile__error-text">{errors.name}</p>
              <div className="profile__field-input">
                <p className="profile__name-input">E-mail</p>
                <input
                  className="profile__input"
                  type="email"
                  name="email"
                  minLength="8"
                  maxLength="40"
                  required
                  value={values.email || ""}
                  onChange={handleChange}
                />
              </div>
              <p className="profile__error-text">{errors.email}</p>
            </fieldset>
            <button
              className={`profile__button-edit ${
                isValid && !isLoading ? "" : "profile__button-submit_disabled"
              }`} 
              type="submit"
              disabled={!isValid}
            >
              Редактировать
            </button>
            <Link
              to="/"
              className="profile__link-exit"
              type="submit"
              onClick={twoClickButton}
              
            >
              Выйти из аккаунта
            </Link>
          </form>
        </section>
      </main>
    </div>
  );
}
export default Profile;
