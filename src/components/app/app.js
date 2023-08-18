import "./App.css";
import React from "react";

import Main from "../Main/Main"
import Movies from "../Movies/Movies"
import { Route, Routes } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
function App() {
  return (
    <div className="page" >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies isMovies={true} />} />
<Route path="/saved-movies" element={<SavedMovies />}/>
<Route path="/profile" element={<Profile/>}/>
<Route path="/signup" element={<Register/>}/>
<Route path="/signin" element={<Login/>}/>
<Route path="/notfound" element={<NotFound/>}/>
      </Routes>


    </div>
  )
}

export default App;
