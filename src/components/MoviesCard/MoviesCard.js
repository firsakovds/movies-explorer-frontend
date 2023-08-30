import "../MoviesCard/MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { getTimeFromMins } from "../../utils/Filter";

function MoviesCard({ movie, onMovieSave, onMovieDelete, likeMovie }) {
  const location = useLocation().pathname;
  const isLiked = likeMovie(movie);

  function handleLike() {
    onMovieSave(movie);
  }

  function handleDelete() {
    onMovieDelete(movie);
  }

  return (
    <li className="card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="card__img"
          src={
            location === "/movies"
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : `${movie.image}`
          }
          alt={`постер к фильму ${movie.nameRU || movie.nameEN}`}
        />
      </a>
      <div className="card__div">
        <h2 className="card__title">{movie.nameRU}</h2>
        {location === "/movies" ? (
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button card__like-button_active" : ""
            }`}
            type="button"
            onClick={isLiked ? handleDelete : handleLike}
          ></button>
        ) : (
          <button
            className="card__delete-button"
            type="button"
            onClick={handleDelete}
          ></button>
        )}
      </div>
      <p className="card__time">{getTimeFromMins(movie.duration)}</p>
    </li>
  );
}
export default MoviesCard;
