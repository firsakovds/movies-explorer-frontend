import "../Navigation/Navigation.css"
import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  //const navigate = useNavigate();
  return (
    <nav className="navigation">
      <div className="navigation__movies-links">
        <Link className="navigation__movies-link" to="/movies">Фильмы</Link>
        <Link className="navigation__movies-link" to="/saved-movies">Сохранённые фильмы</Link>
      </div>
      <div className="navigation__profile">
        <Link className="navigation__profile-link">Аккаунт</Link>
        <button className="navigation__profile-button"/>
      </div>
    </nav>
    

  )
}

export default Navigation;