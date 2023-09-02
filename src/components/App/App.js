import "./App.css";
import React from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { filterMovies, shortsDuration } from "../../utils/Filter";
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
  const [showAllMovies, setShowAllMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [shortMovies, setShortMovies] = React.useState(false);
  const [isWarningMessage, setIsWarningMessage] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = React.useState(null);
  const [text, setText] = React.useState("");

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
    handleFilterMovies([]);

    localStorage.removeItem("movies");
    localStorage.removeItem("allMovies");

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
  //блок saved
  React.useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setShowAllMovies(movies);
      if (localStorage.getItem("checkedShortMovies") === "true") {
        setFilteredMovies(shortsDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("checkedShortMovies") === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("inputText")) {
      if (filteredMovies.length === 0) {
        setIsWarningMessage(true);
      } else {
        setIsWarningMessage(false);
      }
    } else {
      setIsWarningMessage(false);
    }
  }, [filteredMovies]);

  function handleSearchMovies(search) {
    localStorage.setItem("inputText", search);
    localStorage.setItem("checkedShortMovies", shortMovies);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleFilterMovies(movies, search, shortMovies);
    } else {
      setIsLoading(true);
      moviesApi
        .getInitialMovies()
        .then((movies) => {
          handleFilterMovies(movies, search, shortMovies);
        })
        .catch((err) => {
          setInfoTooltipOpen(true);
          setInfoTooltipImage(imageError);
          setText(SERVER_ERROR);
          console.log(err);
          setLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  function handleFilterMovies(movies, search, short) {
    const moviesList = filterMovies(movies, search, short);
    setShowAllMovies(moviesList);
    setFilteredMovies(short ? shortsDuration(moviesList) : moviesList);
    localStorage.setItem("allMovies", JSON.stringify(movies));
    localStorage.setItem("movies", JSON.stringify(moviesList));
  }

  function handleShortMovies() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      if (shortsDuration(showAllMovies).length === 0) {
        setFilteredMovies(shortsDuration(showAllMovies));
      } else {
        setFilteredMovies(shortsDuration(showAllMovies));
      }
    } else {
      setFilteredMovies(showAllMovies);
    }
    localStorage.setItem("checkedShortMovies", !shortMovies);
  }

  function handleLike(card) {
    mainApi
      .createMovie(card)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    mainApi
      .deleteMovie(card._id)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id !== card._id)
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
                savedMovies={savedMovies}
                handleLike={handleLike}
                onMovieDelete={handleCardDelete}
                movies={filteredMovies}
                isWarningMessage={isWarningMessage}
                onSearch={handleSearchMovies}
                onChecked={handleShortMovies}
                onChangeChecked={shortMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                onMovieDelete={handleCardDelete}
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
