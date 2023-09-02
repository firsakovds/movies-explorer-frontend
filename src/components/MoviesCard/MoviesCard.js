import "../MoviesCard/MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { getTimeFromMins } from "../../utils/Filter";

function MoviesCard({
  movie,
  handleLike,
  isLiked,
  savedMovies,
  onMovieDelete,
}) {
  const location = useLocation().pathname;

  function onLikeMovie() {
    if (isLiked) {
      onMovieDelete(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      handleLike(movie);
    }
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
            type="button"
            className={
              isLiked
                ? "card__like-button card__like-button_active"
                : "card__like-button"
            }
            onClick={onLikeMovie}
          ></button>
        ) : (
          <button
            type="button"
            className="card__delete-button"
            onClick={handleDelete}
          ></button>
        )}
      </div>
      <p className="card__time">{getTimeFromMins(movie.duration)}</p>
    </li>
  );
}
export default MoviesCard;
