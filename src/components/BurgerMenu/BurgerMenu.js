import { Link } from "react-router-dom";
import "../BurgerMenu/BurgerMenu.css"
import React from "react"
function BurgerMenu() {
  return (
    <section className="burger-menu burger-menu_open burger-menu_overlay">
      <div className="burger-menu__div">
        <button className="burger-menu__button-close" type="button"></button>
        <div className="burger-menu__links">
          <Link className="burger-menu__link" to="/">Главная
          </Link>
          <Link className="burger-menu__link burger-menu__link_active" to="/movies">Фильмы
          </Link>
          <Link className="burger-menu__link" to="/saved-movies">Сохранённые фильмы
          </Link>
          <Link className="burger-menu__profile" to="/profile">
            <p className="burger-menu__profile-link">Аккаунт</p>
            <button className="burger-menu__profile-icon" />
          </Link>
        </div>
      </div>
    </section>
  )
}
export default BurgerMenu;