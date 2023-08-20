import "../MoviesCardList/MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react"

function MoviesCardList({ isMovies }) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        <MoviesCard isMovies={isMovies} isLiked={true} />
        <MoviesCard isMovies={isMovies} isLiked={true} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} isLiked={true} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} isLiked={true} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} isLiked={true} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} />
        <MoviesCard isMovies={isMovies} />
      </ul>
      <button className="movies-cards__button" type="button">Ещё</button>
    </section>
  )
}
export default MoviesCardList;