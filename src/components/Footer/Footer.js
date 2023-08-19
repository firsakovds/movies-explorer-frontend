import { Link } from "react-router-dom";
import "../Footer/Footer.css"
import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__data">
        <p className="footer__copyright">© 2023</p>
        <ul className="footer__links">
          <li className="footer__links-item">
            <Link className="footer__link" to="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</Link>
          </li>
          <li className="footer__links-item">
            <Link className="footer__link" to="https://github.com/firsakovds" target="_blank">Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
export default Footer;