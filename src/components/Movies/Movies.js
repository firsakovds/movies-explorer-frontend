import "../Movies/Movies.css";
import React from "react";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({
  isLoading,
  movies,
  handleLike,
  savedMovies,
  onMovieDelete,
  onSearch,
  onChangeChecked,
  onChecked,
  isWarningMessage,
}) {
  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm
          onSearch={onSearch}
          onChecked={onChecked}
          onChangeChecked={onChangeChecked}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            savedMovies={savedMovies}
            handleLike={handleLike}
            onMovieDelete={onMovieDelete}
            isWarningMessage={isWarningMessage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default Movies;
