import "../SavedMovies/SavedMovies.css";
import React from "react";
import HeaderMovies from "../Header/HeaderMovies";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filterMovies, shortsDuration } from "../../utils/Filter";

function SavedMovies({ savedMovies, onMovieDelete }) {
  const [inputSaveMovieSearch, setInputSearch] = React.useState("");
  const [filteredSaveMovies, setFilteredSaveMovies] =
    React.useState(savedMovies);
  const [shortSaveMovies, setShortSaveMovies] = React.useState(false);
  const [isWarningMessage, setIsWarningMessage] = React.useState(false);

  React.useEffect(() => {
    const moviesList = filterMovies(savedMovies, inputSaveMovieSearch);
    setFilteredSaveMovies(
      shortSaveMovies ? shortsDuration(moviesList) : moviesList
    );
  }, [savedMovies, shortSaveMovies, inputSaveMovieSearch]);

  React.useEffect(() => {
    if (filteredSaveMovies.length === 0) {
      setIsWarningMessage(true);
    } else {
      setIsWarningMessage(false);
    }
  }, [filteredSaveMovies]);

  function handleSearchSaveMovies(search) {
    setInputSearch(search);
  }

  function handleShortSaveMovies() {
    setShortSaveMovies(!shortSaveMovies);
  }

  return (
    <div>
      <HeaderMovies />
      <main>
        <SearchForm
          onSearch={handleSearchSaveMovies}
          onChecked={handleShortSaveMovies}
        />
        <MoviesCardList
          isWarningMessage={isWarningMessage}
          movies={filteredSaveMovies}
          savedMovies={savedMovies}
          onMovieDelete={onMovieDelete}
        />
      </main>
      <Footer />
    </div>
  );
}
export default SavedMovies;
