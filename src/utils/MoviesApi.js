import { BASE_URL_MOVIES } from "./constants";

export class MoviesApi {
  constructor(options) {
    this._url = options.url;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialMovies = () => {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkError);
  };
}

const moviesApi = new MoviesApi({
  url: BASE_URL_MOVIES,
});

export default moviesApi;
