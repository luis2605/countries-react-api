import React, { useState, useEffect } from "react";

import classes from "./input.module.css";

const Input = ({
  onSetRegion,
  onSetIndividualCountry,
  onIsCountrySelected,
  onDarkMode,
}) => {
  const [showRegion, setShowRegion] = useState(true);

  const selectRegion = (e) => {
    return onSetRegion(e.target.value);
  };
  const selectCountry = (e) => {
    if (e.target.nextElementSibling.value.length > 0) {
      setShowRegion(false);
    } else setShowRegion(true);
    console.log(showRegion);
    return onSetIndividualCountry(e.target.nextElementSibling.value);
  };

  //reset input for country

  const reset = (e) => {
    e.target.value = "";
  };

  return (
    <div
      className={
        !onDarkMode
          ? classes["input-container"]
          : `${classes["input-container"]} ${classes.darkMode}`
      }
    >
      <div
        className={
          !onDarkMode
            ? classes["input-search_container"]
            : `${classes["input-search_container"]} ${classes.darkSearch}`
        }
      >
        <span onClick={selectCountry} class="material-symbols-outlined">
          search
        </span>
        <input
          onClick={reset}
          type="search"
          id="search"
          name="search"
          placeholder="Search for a country..."
          className={classes["input-search"]}
        />
      </div>

      {showRegion && (
        <select
          onChange={selectRegion}
          className={
            !onDarkMode
              ? classes["selector"]
              : `${classes["selector"]} ${classes.darkSearch}`
          }
          id="simple"
          name="simple"
        >
          <option value="">Filter by Region</option>
          <option>Africa</option>
          <option>America</option>
          <option>Asia</option>
          <option>Europe</option>
          <option>Oceania</option>
        </select>
      )}
    </div>
  );
};

export default Input;
