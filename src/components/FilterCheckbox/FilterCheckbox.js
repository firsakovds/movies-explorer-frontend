import "../FilterCheckbox/FilterCheckbox.css";
import React from "react";
function FilterCheckbox() {
  return (
    <div>
      <label className="filter">
        <div className="filter__chechbox">
          <input className="filter__chechbox-input" type="checkbox" />
          <span className="filter__chechbox-switch" />
        </div>
        <p className="filter__clue">Короткометражки</p>
      </label>
    </div>
  );
}
export default FilterCheckbox;
