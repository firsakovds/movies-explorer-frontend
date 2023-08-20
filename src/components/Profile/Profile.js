import "../Profile/Profile.css"
import React from "react"
import HeaderMovies from "../Header/HeaderMovies";
import { Link } from "react-router-dom";
function Profile() {
  return (
    <div>
      <HeaderMovies />
      <main>
        <section className="profile">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form">
            <fieldset className="profile__inputs">
              <div className="profile__field-input">
                <p className="profile__name-input">Имя</p>
                <input className="profile__input" type="name" id="name"  minLength="2" maxLength="40" required />
              </div>
              <div className="profile__field-input">
                <p className="profile__name-input">E-mail</p>
                <input className="profile__input" type="email" id="email"  minLength="2" maxLength="40" required />
              </div>
            </fieldset>
            <button className="profile__button-edit" type="submit">Редактировать</button>
            <Link to="/" className="profile__link-exit" type="submit">Выйти из аккаунта</Link>
          </form>
        </section>
      </main>
    </div>
  )
}
export default Profile;