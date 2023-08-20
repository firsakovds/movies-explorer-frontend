import "../Techs/Techs.css"
import React from "react";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title section-title">Технологии</h2>
      <h3 className="techs__header section-header">7 технологий</h3>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__scroll">
        <li className="techs__scroll-item">HTML</li>
        <li className="techs__scroll-item">CSS</li>
        <li className="techs__scroll-item">JS</li>
        <li className="techs__scroll-item">React</li>
        <li className="techs__scroll-item">Git</li>
        <li className="techs__scroll-item">Express.js</li>
        <li className="techs__scroll-item">mongoDB</li>
      </ul>
    </section>
  )
}
export default Techs;

