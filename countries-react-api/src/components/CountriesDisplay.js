import React, { useEffect, useState, useCallback } from "react";
import classes from "./countriesDisplay.module.css";
import { Card } from "../ui/Card";

const CountriesDisplay = ({
  onRegion,
  onCountry,
  onIsCountrySelected,
  onSingleCountry,
  onDarkMode,
}) => {
  const [countries, setCountries] = useState([]);
  const [selection, setSelection] = useState(
    "https://restcountries.com/v3.1/all"
  );

  const fetchCountries = useCallback(async () => {
    console.log(onIsCountrySelected);
    setSelection((prev) => {
      return onIsCountrySelected
        ? `https://restcountries.com/v3.1/name/${onCountry.toLowerCase()}`
        : `https://restcountries.com/v3.1/region/${onRegion.toLowerCase()}`;
    });
    const response = await fetch(selection);

    const data = await response.json();

    const transformedCountries = data.map((country) => {
      return {
        name: country.name.official,
        common: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flag: country.flags.png,
      };
    });

    setCountries(transformedCountries);
  }, [selection, onCountry, onRegion, onIsCountrySelected]);

  useEffect(() => {
    fetchCountries();
    console.log(onIsCountrySelected);
  }, [fetchCountries, onCountry, onRegion, onIsCountrySelected]);
  // expanded info

  const expandeInfo = (e) => {
    console.log(e.target.id);
    return onSingleCountry(false, e.target.id);
  };

  const cardInfo = countries.map((country) => {
    return (
      <>
        <div className={!onDarkMode ? "" : classes.darkBkg}>
          <section
            className={
              !onDarkMode
                ? classes["country-info"]
                : `${classes["country-info"]} ${classes.darkMode}`
            }
          >
            <img
              id={country.common}
              onClick={expandeInfo}
              src={country.flag}
              alt="flag"
            />
            <h1>{country.name}</h1>
            <p>
              <span className={classes.marked}>Population:</span>{" "}
              {country.population}
            </p>
            <p>
              <span className={classes.marked}>Region:</span> {country.region}
            </p>
            <p>
              <span className={classes.marked}>Capital:</span> {country.capital}
            </p>
          </section>
        </div>
      </>
    );
  });
  return (
    <div
      className={
        onDarkMode
          ? classes["countries-container"]
          : `${classes["countries-container"]} ${classes["darkMode"]}}`
      }
    >
      {cardInfo}
    </div>
  );
};

export default CountriesDisplay;
