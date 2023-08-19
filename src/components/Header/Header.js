import "./Header.css";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../images/logo.svg"

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="логотип" src={logo} />
      </Link>
      <nav className="header__menu">
        <Link to="/signup" className="header__signup-link">Регистрация</Link>
        <button className="header__signin-button" type="button" onClick={() => navigate("/signin")}>Войти</button>
      </nav>
    </header>
  )
}
export default Header;