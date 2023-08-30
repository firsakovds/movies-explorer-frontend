import "../Movies/Movies.css";
import React from "react";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  onSearch,
  isLoading,
  isWarningMessage,
  isServerError,
  movies,
  onChecked,
  onChangeChecked,
  likeMovie,
  savedMovies,
  onMovieSave,
  onMovieDelete,
}) {
  const search = localStorage.getItem("search") || "";

  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm
          onSearch={onSearch}
          onChecked={onChecked}
          onChangeChecked={onChangeChecked}
          value={search}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            likeMovie={likeMovie}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            savedMovies={savedMovies}
            isMoviesPage={true}
            isWarningMessage={isWarningMessage}
            isServerError={isServerError}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default Movies;
