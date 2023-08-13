import "./AboutProject.css";
import React from "react";

function AboutProject() {
  return (
    <section className="about-project" id="AboutProject">
      <h3 className="about-project__title section-title">О проекте</h3>
      <div className="about-project__info">
        <div className="about-project__article">
          <h4 className="about-project__article-title">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="about-project__article-subtitle">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__article">
          <h4 className="about-project__article-title">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="about-project__article-subtitle">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__strip">
        <div className="about-project__backend">
          <p className="about-project__backend-title">1 неделя</p>
          <p className="about-project__strip-subtitle">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <p className="about-project__frontend-title">4 недели</p>
          <p className="about-project__strip-subtitle">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
