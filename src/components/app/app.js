import "./App.css";
import React from "react";

import Main from "../Main/Main"
import Movies from "../Movies/Movies"
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="page" >
      <Routes>
      <Route path="/" element={ <Main />}/>
<Route path="/movies" element={<Movies/>}/>
        
      </Routes>
     

    </div>
  )
}

export default App;
