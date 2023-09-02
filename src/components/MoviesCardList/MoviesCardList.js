import "../MoviesCardList/MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";
import { NOT_FOUND } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import {
  SHOW_MORE_DESKTOP,
  SHOW_MORE_TABLET,
  SHOW_MORE_MOBILE,
  CARD_ON_MOBILE,
  CARD_ON_TABLET,
  CARD_ON_BIG_TABLET,
  CARD_ON_DESKTOP,
  MOBILE_DISPLAY,
  TABLET_DISPLAY,
  TABLET_BIG_DISPLAY,
  DESKTOP_DISPLAY,
} from "../../utils/constants";

function MoviesCardList({
  movies,
  handleLike,
  savedMovies,
  onMovieDelete,
  isWarningMessage,
}) {
  const location = useLocation().pathname;
  const [row, setRow] = React.useState(0);

  React.useEffect(() => {
    changedWindow();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", changedWindow);
    }, 500);

    return () => {
      setTimeout(() => {
        window.removeEventListener("resize", changedWindow);
      });
    };
  });

  function changedWindow() {
    const windowScreen = window.innerWidth;
    if (windowScreen > DESKTOP_DISPLAY) {
      setRow(CARD_ON_DESKTOP);
    } else if (windowScreen > TABLET_BIG_DISPLAY) {
      setRow(CARD_ON_BIG_TABLET);
    } else if (windowScreen > TABLET_DISPLAY) {
      setRow(CARD_ON_TABLET);
    } else if (windowScreen <= MOBILE_DISPLAY) {
      setRow(CARD_ON_MOBILE);
    }
  }

  function handleMore() {
    const windowScreen = window.innerWidth;
    if (windowScreen > DESKTOP_DISPLAY) {
      setRow(row + SHOW_MORE_DESKTOP);
    } else if (windowScreen > TABLET_BIG_DISPLAY) {
      setRow(row + SHOW_MORE_TABLET);
    } else if (windowScreen > TABLET_DISPLAY) {
      setRow(row + SHOW_MORE_MOBILE);
    } else if (windowScreen < MOBILE_DISPLAY) {
      setRow(row + SHOW_MORE_MOBILE);
    }
  }

  function getSavedMovie(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
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
      {location === "/movies" ? (
        <div>
          <ul className="movies-cards__list">
            {movies.slice(0, row).map((movie) => (
              <MoviesCard
                key={movie._id || movie.id}
                movie={movie}
                isLiked={getSavedMovie(savedMovies, movie)}
                handleLike={handleLike}
                savedMovies={savedMovies}
                onMovieDelete={onMovieDelete}
              />
            ))}
          </ul>
          <div className="movies-cards__more">
            {movies.length > row ? (
              <button
                className="movies-cards__more-button"
                type="button"
                onClick={handleMore}
              >
                Ещё
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <ul className="movies-cards__list">
          {movies.map((movie) => (
            <MoviesCard
              key={movie._id || movie.id}
              movie={movie}
              isLiked={getSavedMovie(savedMovies, movie)}
              handleLike={handleLike}
              savedMovies={savedMovies}
              onMovieDelete={onMovieDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
export default MoviesCardList;
