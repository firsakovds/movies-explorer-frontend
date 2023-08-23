import "../SearchForm/SearchForm.css"
import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";



function SearchForm() {



  return (
    <section className="search">
      <form className="search__form"  >
        <div className="search__form-container">
          <input className="search__input" placeholder="Фильм" required
          name="movie"
          type="text"
         
          ></input>
          <button className="search__button" type="submit" >Найти</button>
        </div>
        <FilterCheckbox 
        
        />
      </form>

    </section>
  );
}
export default SearchForm;
