import { Link } from "react-router-dom";
import "../BurgerMenu/BurgerMenu.css"
import React from "react"
function BurgerMenu() {
  return (
    <section className="burger burger__open burger__overlay">
      <div className="burger__div">
        <button className="burger__button-close" type="button"></button>
        <div className="burger__links">
          <Link className="burger__link" to="/">Главная
          </Link>
          <Link className="burger__link burger__link_active" to="/movies">Фильмы
          </Link>
          <Link className="burger__link" to="/saved-movies">Сохранённые фильмы
          </Link>
          <Link className="burger__profile" to="/profile">
            <p className="burger__profile-link">Аккаунт</p>
            <button className="burger__profile-icon" type="button"></button>
          </Link>
        </div>
      </div>
    </section>
  )
}
export default BurgerMenu;