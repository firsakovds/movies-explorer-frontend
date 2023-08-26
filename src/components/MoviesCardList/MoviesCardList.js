import "../MoviesCardList/MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NOT_FOUND,
  TABLET_DISPLAY,
  MOBILE_DISPLAY,
  CARD_ON_DESKTOP,
  CARD_ON_TABLET,
  CARD_ON_MOBILE,
  SHOW_MORE_DESKTOP,
  SHOW_MORE_TABLET_AND_MOBILE,
} from "../../utils/constants";
import { filterMovies } from "../../utils/Filter";

function MoviesCardList({
  likeMovie,
  searchText,
  onMovieSave,
  onMovieDelete,
  checkedCheckbox,
  isLiked,
}) {
  const location = useLocation();
  const [row, setRow] = React.useState(0);
  const [renderMovie, setRenderMovie] = React.useState([]);
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

  function handleCheckboxChecked(movie) {
    if (likeMovie.find((likeMovie) => likeMovie.movieId === movie.id)) {
      return true;
    } else {
      return false;
    }
  }
  function more() {
    if (windowScreen > 1280) {
      setRow(row + SHOW_MORE_DESKTOP);
    } else {
      setRow(row + SHOW_MORE_TABLET_AND_MOBILE);
    }
  }

  React.useEffect(() => {
    if (location.pathname === "/movies") {
      const moviesStorage = JSON.parse(localStorage.getItem("movies"));
      if (moviesStorage) {
        if (moviesStorage.movies.length > 0) {
          if (checkedCheckbox === true) {
            setRenderMovie(filterMovies(moviesStorage.movies, checkedCheckbox));
            localStorage.setItem(
              "movies",
              JSON.stringify({
                movies: moviesStorage.movies,
                searchText: moviesStorage.searchText,
                checkedShorts: true,
              })
            );
          } else {
            const allMovies = JSON.parse(localStorage.getItem("all-movies"));
            const newMovies = filterMovies(
              allMovies,
              checkedCheckbox,
              moviesStorage.searchText
            );
            setRenderMovie(newMovies);
            localStorage.setItem(
              "movies",
              JSON.stringify({
                movies: newMovies,
                searchText: moviesStorage.searchText,
                checkedShorts: false,
              })
            );
          }
        } else {
          setRenderMovie(moviesStorage.movies);
        }
      }
    } else {
      likeMovie.length > 0
        ? setRenderMovie(likeMovie)
        : setRenderMovie([NOT_FOUND]);
      if (checkedCheckbox === true) {
        setRenderMovie(filterMovies(likeMovie, checkedCheckbox));
      } else {
        const savedMoviesStorage = JSON.parse(
          localStorage.getItem("saved-movies")
        );
        setRenderMovie(
          filterMovies(savedMoviesStorage, checkedCheckbox, searchText)
        );
      }
    }
  }, [searchText, likeMovie, useNavigate, checkedCheckbox]);

  return (
    <section className="movies-cards">
      {typeof renderMovie[0] !== "string" ? (
        <>
          <ul className="movies-cards__list">
            {renderMovie.slice(0, row).map((movie) => {
              return (
                <MoviesCard
                  key={movie.id || movie.movieId}
                  movie={movie}
                  onMovieSave={onMovieSave}
                  onMovieDelete={onMovieDelete}
                  isLiked={isLiked}
                  onCheckboxChecked={handleCheckboxChecked(movie)}
                />
              );
            })}
          </ul>
          {location.pathname === "/movies" && row < renderMovie.length && (
            <div className="movies__more">
              <button
                className="movies-cards__button"
                type="button"
                onClick={more}
              >
                Ещё
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="movies-cards__warning">{renderMovie[0]}</p>
      )}
    </section>
  );
}
export default MoviesCardList;
