import "../SavedMovies/SavedMovies.css";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";

import Preloader from "../Preloader/Preloader";

function SavedMovies({
  isLoading,
  likeMovie,
  searchText,
  onMovieDelete,
  onSearch,
  checkedShortMovies,
}) {
  const [checkedCheckbox, setCheckedCheckbox] = React.useState(false);

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
            likeMovie={likeMovie}
            searchText={searchText}
            onMovieDelete={onMovieDelete}
            checkedCheckbox={checkedCheckbox}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default SavedMovies;
