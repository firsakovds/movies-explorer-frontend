import "../SearchForm/SearchForm.css";
import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../utils/Validation";

function SearchForm({ onSearch, onChecked, onChangeChecked, value }) {
  const { handleChange, isValid } = useFormWithValidation();
  const [errorText, setErrorText] = React.useState("");
  const [inputSearch, setInputSearch] = React.useState("");

  React.useEffect(() => {
    setInputSearch(value);
  }, [value]);

  function handleFormChange(evt) {
    setInputSearch(evt.target.value);
    handleChange(evt);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!isValid) {
      setErrorText("Введите название фильма");
      return;
    }
    onSearch(inputSearch);
  }
  return (
    <section className="search">
      <span className="search__message">{!isValid && errorText}</span>
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <div className="search__form-container">
          <input
            className="search__input"
            placeholder="Фильм"
            name="search"
            type="text"
            value={inputSearch || ""}
            required
            onChange={handleFormChange}
          />
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
