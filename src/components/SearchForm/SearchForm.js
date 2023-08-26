import "../SearchForm/SearchForm.css";
import React from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../utils/Validation";

function SearchForm({ onSearch, onChecked, onChangeChecked }) {
  const location = useLocation();
  const { values, handleChange, setIsValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const { search } = values;
    onSearch(search);
  }

  React.useEffect(() => {
    setIsValid(true);
    if (location.pathname === "/movies") {
      const moviesStorage = JSON.parse(localStorage.getItem("movies"));
      if (moviesStorage) {
        values.search = moviesStorage.searchText;
      }
    }
  }, [location]);

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit} >
        <div className="search__form-container">
          <input
            className="search__input"
            placeholder="Фильм"
            required
            name="search"
            type="text"
            onChange={handleChange}
            value={values.search || ""}
          ></input>
          <button className="search__button" type="submit">
            Найти
          </button>
        </div>
        <FilterCheckbox
          onChecked={onChecked}
          onChangeChecked={onChangeChecked}
        />
      </form>
    </section>
  );
}
export default SearchForm;
