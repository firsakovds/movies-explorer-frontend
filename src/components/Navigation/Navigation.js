import "../Navigation/Navigation.css";
import React from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Navigation() {
  //const navigate = useNavigate();
  return (
    <nav className="navigation">
      <div className="navigation__movies-links">
        <Link className="navigation__movies-link" to="/movies">
          Фильмы
        </Link>
        <Link className="navigation__movies-link" to="/saved-movies">
          Сохранённые фильмы
        </Link>
      </div>
      <Link className="navigation__profile" to="/profile">
        <p className="navigation__profile-link">Аккаунт</p>
        <button className="navigation__profile-icon" />
      </Link>
      <BurgerMenu />
    </nav>
  );
}

export default Navigation;
