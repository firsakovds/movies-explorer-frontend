import "../Movies/Movies.css"
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer"
//import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";
function Movies() {
  return(
    <div>
      <HeaderMovies/>
<SearchForm/>
{/*<Preloader/> */}
<MoviesCardList/>
<Footer/>
    </div>
  )
}
export default Movies;