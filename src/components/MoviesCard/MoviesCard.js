import "../MoviesCard/MoviesCard.css"
import film from "../../images/card_pic.png"
import React from "react"

function MoviesCard({ isMovies, isLiked }) {
  return (
    <li className="card">
      <img className="card__img" src={film} alt="постер фильма зона" />
      <div className="card__div">
        <h2 className="card__title">Зона</h2>
        <button className={(` ${isMovies ? 'card__like-button' : 'card__delete-button'} ${isLiked ? 'card__like-button_active' : ''} `)} type="button" ></button>
      </div>
      <p className="card__time">1ч 42м</p>
    </li>
  )
}
export default MoviesCard;