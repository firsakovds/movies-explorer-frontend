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
      <div className="header__menu">
        <Link to="/signup" className="header__signup-link">Регистрация</Link>
        <button className="header__signin-button" onClick={() => navigate("/signin")}>Войти</button>
      </div>
    </header>
  )
}
export default Header;