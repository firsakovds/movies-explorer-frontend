import "../Movies/Movies.css"
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer"
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";
function Movies({ isMovies }) {
  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm />
        <Preloader />
        <MoviesCardList isMovies={isMovies} />
      </main>
      <Footer />
    </div>
  )
}
export default Movies;