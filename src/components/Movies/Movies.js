import "../Movies/Movies.css";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";
import { useLocation } from "react-router-dom";
function Movies({
  isLoading,
  searchText,
  likeMovie,
  onSearch,
  onMovieSave,
  onMovieDelete,
  checkedShortMovies,
  isLiked,
}) {
  const location = useLocation();
  const checkboxFromStorage = localStorage.getItem("movies")
    ? location.pathname === "/movies" &&
      JSON.parse(localStorage.getItem("movies")).checkedShortMovies
    : null;
  const [checkedCheckbox, setCheckedCheckbox] = React.useState(
    checkboxFromStorage || false
  );

  function handleChange() {
    setCheckedCheckbox(!checkedCheckbox);
    checkedShortMovies(!checkedCheckbox);
  }

  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm
          onSearch={onSearch}
          checkedCheckbox={checkedCheckbox}
          onChangeChecked={handleChange}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            searchText={searchText}
            likeMovie={likeMovie}
            onMovieSave={onMovieSave}
            onMovieDelete={onMovieDelete}
            checkedCheckbox={checkedCheckbox}
            isLiked={isLiked}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default Movies;
