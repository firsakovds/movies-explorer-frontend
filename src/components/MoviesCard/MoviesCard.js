import "../MoviesCard/MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { getTimeFromMins } from "../../utils/Filter";

function MoviesCard({ movie, onMovieSave, onMovieDelete, isLiked, likeMovie }) {
  const location = useLocation();
  const moviesLocation = location.pathname === "/movies";
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    likeMovie?.map((m) => {
      if (movie._id === m._id) {
        setIsSaved(true);
      }
    });
  }, [likeMovie]);

  function handleLike() {
    if (!isSaved) {
      onMovieSave(movie);
      setIsSaved(true);
    } else {
      onMovieDelete(movie);
      setIsSaved(false);
    }
  }

  const handleDelete = () => {
    onMovieDelete(movie);
    setIsSaved(false);
  };

  return (
    <li className="card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="card__img"
          src={
            moviesLocation
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU}
        />
      </a>
      <div className="card__div">
        <h2 className="card__title">{movie.nameRU}</h2>
        {moviesLocation ? (
          <button
            className={`${
              isLiked(movie) ? "card__like-button_active" : "card__like-button"
            }`}
            type="button"
            onClick={handleLike}
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
