import "./Main.css"
import React from "react";
import Header from "../Header/Header.js";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio"
import Footer from "../Footer/Footer"
import HeaderMovies from "../Header/HeaderMovies";
function Main({loggedIn}) {
  return (
    <div>
      {loggedIn ? (<HeaderMovies/>) : (<Header/>)}
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </div>
  )
}

export default Main;