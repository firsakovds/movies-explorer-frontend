import "./Promo.css";
import React from "react";
import promoLogo from "../../images/promo_logo.svg";
function Promo() {
  return (
    <section className="promo">
      <div className="promo__text">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a className="promo__link" href="#AboutProject">
          Узнать больше
        </a>
      </div>
      <img className="promo__logo" alt="земной шар" src={promoLogo} />
    </section>
  );
}

export default Promo;
