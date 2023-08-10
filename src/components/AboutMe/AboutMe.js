import "../AboutMe/AboutMe.css";
import React from "react";
import { Link } from "react-router-dom";
import MyFoto from "../../images/myfoto.jpg";
function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h3 className="about-me__title section-title">Студент</h3>
      <div className="about-me__div">
        <div className="about-me__info">
          <h2 className="about-me__header section-header">Дмитрий</h2>
          <p className="about-me__subtitle">
            Юный фронтенд-разработчик, 35 лет
          </p>
          <p className="about-me__description">
            Я родился в г. Калинин(так в паспорте написано), 17 июля 1990 года
            Калинин был переименован в Тверь. Был в школе 11 классов, далее
            университет ТГТУ(квалификация инженер). 10 лет программировал станки
            с чпу, токарные фрезерные, лазерные, плазменные. Станки
            программировать достаточно скучно, однообразно, поэтому решил
            обучиться на front-end разработчика. Умею ездить на велосипеде и
            стрелять из лука, одновременно(иногда даже попадаю в цель)
          </p>
          <Link
            to="https://github.com/firsakovds"
            className="about-me__link"
            target="_blank"
          >
            Github
          </Link>
        </div>
        <img
          className="about-me__foto"
          src={MyFoto}
          alt="Фотография юного студента"
        />
      </div>
    </section>
  );
}

export default AboutMe;
