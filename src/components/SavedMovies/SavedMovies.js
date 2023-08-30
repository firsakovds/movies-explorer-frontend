import "../SavedMovies/SavedMovies.css";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";

import Preloader from "../Preloader/Preloader";

function SavedMovies({
  isLoading,
  movies,
  onChecked,
  likeMovie,
  onSearch,
  onChangeChecked,
  isWarningMessage,
  savedMovies,
  onMovieDelete,
}) {
  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm
          onChecked={onChecked}
          onChangeChecked={onChangeChecked}
          onSearch={onSearch}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            onMovieDelete={onMovieDelete}
            savedMovies={savedMovies}
            likeMovie={likeMovie}
            isWarningMessage={isWarningMessage}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default SavedMovies;
