import "../SavedMovies/SavedMovies.css"
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";
function SavedMovies() {
  return (
    <div>
      <HeaderMovies />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  )
}
export default SavedMovies;