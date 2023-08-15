import "../SearchForm/SearchForm.css"
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import React from "react"
 function SearchForm() {
  return(
    <section className="search">
<form className="search__form">
  <input className="search__input" placeholder="Фильм" required></input>
  <button className="search__button" type="submit">Найти</button>
</form>
<FilterCheckbox/>
    </section>
  )
 }
 export default SearchForm;