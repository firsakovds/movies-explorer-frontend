import "../Portfolio/Portfolio.css";
import React from "react";
import arrow from "../../images/portfolio_arrow.svg";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/firsakovds/how-to-learn" target="_blank">
            <p className="portfolio__list-text">Статичный сайт</p>
            <img className="portfolio__list-arrow" src={arrow} alt="стрелка" />
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/firsakovds/russian-travel" target="_blank">
            <p className="portfolio__list-text">Адаптивный сайт</p>
            <img className="portfolio__list-arrow" src={arrow} alt="стрелка" />
          </Link>
        </li>
        <li className="portfolio__list-item">
          <Link className="portfolio__link" to="https://github.com/firsakovds/react-mesto-api-full-gha" target="_blank">
            <p className="portfolio__list-text">Одностраничное приложение</p>
            <img className="portfolio__list-arrow" src={arrow} alt="стрелка" />
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
