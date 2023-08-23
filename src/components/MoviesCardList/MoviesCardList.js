import "../MoviesCardList/MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react"



function MoviesCardList( ) {
  
  return (
    <section className="movies-cards">
       <p className="movies-cards__warning">Фильмы не найдены</p>
      <ul className="movies-cards__list">
        <MoviesCard 
        //isMovies={isMovies} isLiked={true} //
  />
       
       
      </ul>
      <button className="movies-cards__button" type="button" >Ещё</button>
    </section>
  )
}
export default MoviesCardList;