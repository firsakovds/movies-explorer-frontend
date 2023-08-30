import "../MoviesCardList/MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";
import { NOT_FOUND } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import {
  TABLET_DISPLAY,
  MOBILE_DISPLAY,
  CARD_ON_DESKTOP,
  CARD_ON_TABLET,
  CARD_ON_MOBILE,
  SHOW_MORE_DESKTOP,
  SHOW_MORE_TABLET_AND_MOBILE,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  onMovieSave,
  onMovieDelete,
  likeMovie,
  isWarningMessage,
}) {
  const location = useLocation();
  const [row, setRow] = React.useState(0);
  const windowScreen = window.innerWidth;

  React.useEffect(() => {
    changedWindow();
  }, [windowScreen]);

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", changedWindow);
    }, 1000);
  });

  function changedWindow() {
    if (windowScreen > TABLET_DISPLAY) {
      setRow(CARD_ON_DESKTOP);
    } else if (windowScreen > MOBILE_DISPLAY) {
      setRow(CARD_ON_TABLET);
    } else {
      setRow(CARD_ON_MOBILE);
    }
  }

  function handleMore() {
    if (windowScreen > 1280) {
      setRow(row + SHOW_MORE_DESKTOP);
    } else {
      setRow(row + SHOW_MORE_TABLET_AND_MOBILE);
    }
  }

  return (
    <section className="movies-cards">
      <p
        className={
          isWarningMessage
            ? "movies-cards__warning"
            : "movies-cards__warning_hidden"
        }
      >
        {NOT_FOUND}
      </p>

      <ul className="movies-cards__list">
        {movies.slice(0, row).map((movie) => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            likeMovie={likeMovie}
          />
        ))}
      </ul>
      {location.pathname === "/movies" && movies.length > row ? (
        <button
          className="movies-cards__button"
          type="button"
          onClick={handleMore}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </section>
  );
}
export default MoviesCardList;
