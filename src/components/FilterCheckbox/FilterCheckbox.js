import "../FilterCheckbox/FilterCheckbox.css";
import React from "react";
function FilterCheckbox({ onChecked, onChangeChecked }) {
  return (
    <div>
      <label className="filter">
        <div className="filter__chechbox">
          <input className="filter__chechbox-input" type="checkbox" 
         checked={onChecked} onChange={onChangeChecked}/>
          <span className="filter__chechbox-switch" />
        </div>
        <p className="filter__clue">Короткометражки</p>
      </label>
    </div>
  );
}
export default FilterCheckbox;
