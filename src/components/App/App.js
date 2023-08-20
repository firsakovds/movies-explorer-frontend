import "./App.css";
import React from "react";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import { Route, Routes, useNavigate} from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import * as auth from '../../utils/Auth';
import mainApi from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    tokenCheck();
}, []);


    //проверка токена
    function tokenCheck() {
      const token = localStorage.getItem("jwt");
      if (token) {
          mainApi.getUserInfo()
              .then((res) => {
                  if (res) {
                      setCurrentUser({
                          name: res.name,
                          email: res.email,
                          _id: res._id
                      });
                      setLoggedIn(true);
                  }
              })
              .catch((err) => {
                console.log(`Ошибка ${err}`);
                 
              });
      }
  }
    // логин
    function handleLogin({password, email}) {
      auth.authorize({password, email})
          .then((res) => {
              if (res.token) {
                  setLoggedIn(true);
                  localStorage.setItem("jwt", res.token);
                  tokenCheck();
                                  
                  navigate('/movies');
              }
          })
          .catch((err) => {             
              console.log(`Ошибка ${err}`);
          })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
<div className="page">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies isMovies={true}/>} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login 
         loggedIn={loggedIn}
          onLogin={handleLogin}
         
          />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
    
  );
}

export default App;
