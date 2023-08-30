import { SHORT_DURATION } from "../utils/constants";

export function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours > 0 ? hours + "ч " + minutes + "м" : minutes + "м";
}

export const filterMovies = (movies, inputSearch, checkbox) => {
  const moviesSearchText = movies.filter((movie) => {
    return (
      movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(inputSearch.toLowerCase())
    );
  });
  if (checkbox) {
    return shortMovies(moviesSearchText);
  } else {
    return moviesSearchText;
  }
};

export const shortMovies = (movies) => {
  return movies.filter((movie) => movie.duration <= SHORT_DURATION);
};
