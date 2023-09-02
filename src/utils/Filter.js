import { SHORT_DURATION } from "../utils/constants";

export function getTimeFromMins(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours > 0 ? hours + "ч " + minutes + "м" : minutes + "м";
}

export function filterMovies(movies, inputSearch) {
  const moviesSearchText = movies.filter((movie) => {
    return (
      movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(inputSearch.toLowerCase())
    );
  });
  return moviesSearchText;
}

export function shortsDuration(movies) {
  return movies.filter((movie) => movie.duration < SHORT_DURATION);
}
