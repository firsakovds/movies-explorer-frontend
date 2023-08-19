import "../Header/HeaderMovies.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg"
import Navigation from "../Navigation/Navigation";

function HeaderMovies() {
  return (
    <header className="header__movies">
      <Link to="/">
        <img className="header__logo-movies" alt="логотип" src={logo} />
      </Link>
      <Navigation />
    </header>
  )
}
export default HeaderMovies;