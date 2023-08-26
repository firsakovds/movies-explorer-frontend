import "./App.css";
import React from "react";
//import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
import moviesApi from '../../utils/MoviesApi';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { filterMovies } from '../../utils/Filter';
import { SERVER_ERROR } from '../../utils/constants';
import imageError from "../../images/signDown.svg"
import imageSuccess from "../../images/signUp.svg"
import {ACCESS_IS_DENAIED, ACCESS_IS_ALLOWED, ACCESS_IS_BYE, ACCESS_IS_DATA, ACCESS_IS_DONE} from "../../utils/constants"
function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [likeMovie, setLikeMovie] = React.useState([]); 
  const [checkedShortMovies, setCheckedShortMovies] = React.useState(false);  
  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = React.useState(null);
  const [text, setText] = React.useState('');
 /*
infoTooltipOpen(true);
setInfoTooltipImage(imageSuccess);
setText();
*/

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
          getAllMovies();
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
      })
      
  }
  //удалим токен
  function handleSignOut() {   
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "", _id: "" });   

    navigate("/");
 
  }
  // обновим профиль
  function handleUpdateUser({ name, email }) {
    //setIsLoading(true);
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
    //setIsLoading(true);
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
//
function getAllMovies() {
  moviesApi.getInitialMovies()
    .then((allMovies) => localStorage.setItem('all-movies', JSON.stringify(allMovies)))
    .catch((err) => {      
      console.log(err);
      });
}
function handleSearchMovie (searchText)  {
  setSearchText(searchText)
 // setIsLoading(true);
  if (location.pathname === '/movies') {
    try {
      const allMovies = JSON.parse(localStorage.getItem('all-movies'))
      const newMovies = filterMovies(allMovies, checkedShortMovies, searchText)
      localStorage.setItem('movies', JSON.stringify({ movies: newMovies, searchText: searchText, checkedShortMovies: checkedShortMovies }));
    }
    catch (err) {
      console.log(err);
      return localStorage.setItem('movies', JSON.stringify({
        movies: [SERVER_ERROR],
        searchText: searchText
      }));
    }
    finally {
      //setIsLoading(false)
    }
  } else {
    try {
      const newMovies = filterMovies(JSON.parse(localStorage.getItem('saved-movies')), checkedShortMovies, searchText);
      setLikeMovie(newMovies);
    }
    catch (err) {
      console.log(err);
      setLikeMovie([SERVER_ERROR]);
    }
    finally {
     // setIsLoading(false)
    }
  }
}
// фильтр
// поставить лайк=сохранить фильм
// обработка попадания в сохраненные
const handleMovieSave = (someMovie) => {
  const likedMovie = likeMovie.find((m) => m.movieId === someMovie.id);  
  tokenCheck();
  (likedMovie) ? handleMovieDelete(likedMovie) :
      mainApi.createMovie(someMovie).then((res) => {
          setLikeMovie((likeMovie) => [...likeMovie, res]);
          localStorage.setItem("saved-movies", JSON.stringify([...likeMovie, res])
          );
      }).catch(
          (err) => {
              console.log(err);

          }
      )
}

// удаление лайка=удалить из массива фильм
function handleMovieDelete(movie)  {
  const movieId = movie._id || (likeMovie.find((m) => m.movieId === movie.id))._id;
  function deleteFromList(moviesArray)  {
    return moviesArray.filter((oneMovie) => oneMovie._id !== movieId)
  }
  mainApi.deleteMovie(movieId)
    .then(() => {
      setLikeMovie((moviesArray) => deleteFromList(moviesArray));
      const newStorage = deleteFromList(JSON.parse(localStorage.getItem('saved-movies')));
      localStorage.setItem('saved-movies', JSON.stringify(newStorage));
    })
    .catch((err) => {     
      console.log(err)
    });
}

React.useEffect(() => {
  if (loggedIn === true) {
    setIsLoading(true);
    mainApi.getUserAndSavedMovies()
      .then(([user, movies]) => {
        setCurrentUser(user);
        setLikeMovie(movies);
        localStorage.setItem('saved-movies', JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }
}, [loggedIn, navigate]);

function isLiked(movie)  {
  return likeMovie.some(m => m.movieId === movie.id)
}
function closePopUp() {
  setInfoTooltipOpen(false)
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
            
             <Movies  
              isLoading={isLoading}
              loggedIn={loggedIn}
              searchText={searchText}
              likeMovie={likeMovie}
              onSearch={handleSearchMovie}
              checkedShortMovies={setCheckedShortMovies}
              onMovieSave={handleMovieSave}
              onMovieDelete={handleMovieDelete} 
              isLiked={isLiked}        
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
      
              isLoading={isLoading}
              loggedIn={loggedIn}
              likeMovie={likeMovie}
              searchText={searchText}
              onSearch={handleSearchMovie}
              onMovieDelete={handleMovieDelete}
              checkedShortMovies={setCheckedShortMovies} 
              isLiked={isLiked}           
              />
            }
          />
          <Route
            path="/profile"
            element={ 
              <Profile
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
