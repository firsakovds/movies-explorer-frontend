import "./App.css";
import React from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import auth from "../../utils/Auth";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { filterMovies, shortMovies } from "../../utils/Filter";
import imageError from "../../images/signDown.svg";
import imageSuccess from "../../images/signUp.svg";
import {
  ACCESS_IS_DENAIED,
  ACCESS_IS_ALLOWED,
  ACCESS_IS_BYE,
  ACCESS_IS_DATA,
  ACCESS_IS_DONE,
  SERVER_ERROR,
} from "../../utils/constants";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [foundedMovies, setFoundedMovies] = React.useState([]);
  const [foundMoviesList, setFoundMoviesList] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [showAllMovies, setShowAllMovies] = React.useState(savedMovies);
  const [filterSavedMovies, setFilterSavedMovies] =
    React.useState(showAllMovies);
  const [search, setSearch] = React.useState("");
  const [checkedShortMovies, setCheckedShortMovies] = React.useState(false);
  const [checkedShortSaveMovie, setCheckedShortSaveMovie] =
    React.useState(false);
  const [isWarningMessage, setIsWarningMessage] = React.useState(false);
  const [isWarningMessageSaveMovi, setIsWarningMessageSaveMovi] =
    React.useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = React.useState(null);
  const [text, setText] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("jwt")) {
      handleSignOut();
    }
  }, []);
  //проверка токена
  function tokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi
        .getUserInfo()
        .then((res) => {
          if (res) {
            setCurrentUser({
              name: res.name,
              email: res.email,
              _id: res._id,
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      mainApi
        .getSavedMovies()
        .then((data) => {
          setLoggedIn(true);
          setSavedMovies(data);
          setFilterSavedMovies(data);
          setShowAllMovies(data);
        })
        .catch((err) => {
          setInfoTooltipOpen(true);
          setInfoTooltipImage(imageError);
          setText(SERVER_ERROR);
          console.log(err);
          setLoggedIn(false);
        });
    }
  }
  // логин
  function handleLogin({ password, email }) {
    auth
      .authorize({ password, email })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          tokenCheck();
          navigate("/movies");
          setInfoTooltipOpen(true);
          setInfoTooltipImage(imageSuccess);
          setText(ACCESS_IS_ALLOWED);

          moviesApi.getInitialMovies().then((userMovies) => {
            localStorage.setItem("movies", JSON.stringify(userMovies));
            setAllMovies(JSON.parse(localStorage.getItem("movies")));
          });
        }
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setInfoTooltipImage(imageError);
        setText(ACCESS_IS_DENAIED);
        console.log(err);
      });
  }
  //удалим токен
  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "", _id: "" });
    setFoundMoviesList([]);
    setCheckedShortMovies(false);
    setSearch("");
    setIsWarningMessageSaveMovi(false);
    setIsWarningMessage(false);
    navigate("/");
  }
  // обновим профиль
  function handleUpdateUser({ name, email }) {
    mainApi
      .updateUserInfo({ name, email })
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
        setInfoTooltipOpen(true);
        setInfoTooltipImage(imageSuccess);
        setText(ACCESS_IS_DATA);
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setInfoTooltipImage(imageError);
        setText(ACCESS_IS_DENAIED);
        console.log(err);
      });
  }
  // регистрация
  function handleRegister({ name, password, email }) {
    auth
      .register({ name, password, email })
      .then(() => {
        handleLogin({ password, email });
        navigate("/movies");
        setInfoTooltipOpen(true);
        setInfoTooltipImage(imageSuccess);
        setText(ACCESS_IS_DONE);
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setInfoTooltipImage(imageError);
        setText(ACCESS_IS_DENAIED);
        console.log(err);
      });
  }

  //далее блок /movies
  React.useEffect(() => {
    setSearch(localStorage.getItem("search" || ""));
    setCheckedShortMovies(
      localStorage.getItem("checkedShortMovies" || "") === "true"
    );
    if (localStorage.getItem("searchListMovies")) {
      const movies = JSON.parse(localStorage.getItem("searchListMovies"));
      setFoundedMovies(movies);
      if (movies.length === 0) {
        setIsWarningMessage(true);
      }
      if (localStorage.getItem("checkedShortMovies") === "true") {
        setFoundMoviesList(shortMovies(movies));
      } else {
        setFoundMoviesList(movies);
      }
    }
  }, []);

  function handleChangeCheckbox() {
    setCheckedShortMovies(!checkedShortMovies);
    if (!checkedShortMovies) {
      const filteredShortMovies = shortMovies(foundedMovies);
      setFoundMoviesList(filteredShortMovies);
      if (filteredShortMovies.length === 0) {
        setIsWarningMessage(true);
      }
    } else {
      setFoundMoviesList(foundedMovies);
      if (foundedMovies.length > 0) {
        setIsWarningMessage(false);
      }
    }
    localStorage.setItem("checkedShortMovies", !checkedShortMovies);
  }

  function handleSetFilterMovies(movies, inputSearch, checkbox) {
    const searchList = filterMovies(movies, inputSearch, false);
    searchList.length === 0
      ? setIsWarningMessage(true)
      : setIsWarningMessage(false);
    setFoundedMovies(searchList);
    setFoundMoviesList(checkbox ? shortMovies(searchList) : searchList);
    localStorage.setItem("searchListMovies", JSON.stringify(searchList));
  }

  function handleRequestMovies(inputSearch) {
    localStorage.setItem("search", inputSearch);
    localStorage.setItem("checkedShortMovies", checkedShortMovies);
    if (allMovies.length === 0) {
      setIsLoading(true);
      moviesApi
        .getInitialMovies()
        .then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          setAllMovies(movies);
          handleSetFilterMovies(movies, inputSearch, checkedShortMovies);
        })
        .catch((err) => {
          setInfoTooltipOpen(true);
          setInfoTooltipImage(imageError);
          setText(SERVER_ERROR);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      handleSetFilterMovies(allMovies, inputSearch, checkedShortMovies);
    }
  }

  //далее блок /saved-movies
  React.useEffect(() => {
    if (localStorage.getItem("checkedShortSaveMovie") === "true") {
      setCheckedShortSaveMovie(true);
      setShowAllMovies(shortMovies(savedMovies));
    } else {
      setCheckedShortSaveMovie(false);
      setShowAllMovies(savedMovies);
    }
  }, [savedMovies]);

  React.useEffect(() => {
    if (savedMovies.length === 0) {
      return;
    }
  }, [search, foundMoviesList, savedMovies]);

  function handleChangeCheckboxSavedMovies() {
    setCheckedShortSaveMovie(!checkedShortSaveMovie);
    if (!checkedShortSaveMovie) {
      localStorage.setItem("checkedShortSaveMovie", true);
      setCheckedShortSaveMovie(true);
      setShowAllMovies(shortMovies(filterSavedMovies));
      if (shortMovies(filterSavedMovies).length === 0) {
        setIsWarningMessageSaveMovi(false);
      }
      setIsWarningMessageSaveMovi(false);
    } else {
      setCheckedShortSaveMovie(false);
      localStorage.setItem("checkedShortSaveMovie", false);
      if (filterSavedMovies.length === 0) {
        setIsWarningMessageSaveMovi(false);
        setShowAllMovies(filterSavedMovies);
      }
      setIsWarningMessageSaveMovi(false);
      setShowAllMovies(filterSavedMovies);
    }
  }

  function handleSearchSavedMovies(inputSearch) {
    const foundSavedMovies = filterMovies(
      savedMovies,
      inputSearch,
      checkedShortSaveMovie
    );
    if (foundSavedMovies.length === 0) {
      setIsWarningMessageSaveMovi(true);
      setShowAllMovies(foundSavedMovies);
      setFilterSavedMovies(foundSavedMovies);
    } else {
      setIsWarningMessageSaveMovi(false);
      setFilterSavedMovies(foundSavedMovies);
      setShowAllMovies(foundSavedMovies);
    }
  }

  React.useEffect(() => {
    if (location.pathname === "/saved-movies") {
      setCheckedShortSaveMovie(false);
      setShowAllMovies(savedMovies);
    }
  }, [location]);

  //далее обработка лайка дислайка удаления
  function likeMovie(movie) {
    return savedMovies.some((item) => item.movieId === movie.id);
  }

  function handleLike(movie) {
    const jwt = localStorage.getItem("jwt");
    mainApi
      .createMovie(movie, jwt)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        setFilterSavedMovies([...savedMovies, newMovie]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(movie) {
    const jwt = localStorage.getItem("jwt");
    const deleteCard = savedMovies.find(
      (item) => item.movieId === (movie.id || movie.movieId)
    );
    if (!deleteCard) return;
    mainApi
      .deleteMovie(deleteCard._id, jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter((c) => c._id !== deleteCard._id));
        setFilterSavedMovies(
          savedMovies.filter((c) => c._id !== deleteCard._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closePopUp() {
    setInfoTooltipOpen(false);
  }
  function handleExit() {
    setInfoTooltipOpen(true);
    setInfoTooltipImage(imageSuccess);
    setText(ACCESS_IS_BYE);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                isLoading={isLoading}
                loggedIn={loggedIn}
                likeMovie={likeMovie}
                movies={foundMoviesList}
                onMovieSave={handleLike}
                onMovieDelete={handleDelete}
                savedMovies={savedMovies}
                isWarningMessage={isWarningMessage}
                onSearch={handleRequestMovies}
                onChecked={handleChangeCheckbox}
                onChangeChecked={checkedShortMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                isLoading={isLoading}
                movies={showAllMovies}
                likeMovie={likeMovie}
                saveMovie={savedMovies}
                isWarningMessage={isWarningMessageSaveMovi}
                onMovieDelete={handleDelete}
                onSearch={handleSearchSavedMovies}
                onChecked={handleChangeCheckboxSavedMovies}
                onChangeChecked={checkedShortSaveMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Profile}
                isExit={handleExit}
                onSignOut={handleSignOut}
                onUpdateUser={handleUpdateUser}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/signin"
            element={<Login loggedIn={loggedIn} onLogin={handleLogin} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <InfoTooltip
        isOpen={infoTooltipOpen}
        onClose={closePopUp}
        text={text}
        image={infoTooltipImage}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
