import "../MoviesCard/MoviesCard.css"
import film from "../../images/card_pic.png"
import React from "react"

function MoviesCard() {
  return (
    <li className="card">
      <img className="card_img" src={film} alt="обложка фильма" />
      <div className="card__div">
        <h2 className="card__title">Зона</h2>
        <button  className="card__like-button"></button>       
      </div>
      <p className="card__time">1ч 42м</p>
    </li>
  )
}
export default MoviesCard;