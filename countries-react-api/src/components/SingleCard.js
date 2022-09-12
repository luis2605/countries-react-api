import React, { useState, useEffect, useCallback } from "react";
import { Card } from "../ui/Card";
import classes from "./singleCard.module.css";

const SingleCard = ({ onCountrySelected, onSingleCountry }) => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //back btn
  const backBtnHandler = () => {
    onSingleCountry(true);
  };
  //fetch data from api
  const fetchCountry = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${onCountrySelected.toLowerCase()}`
      );
      if (!response.length === 0) {
        throw new Error("somethin went wrong");
      }
      const data = await response.json();

      console.log(data);

      const transformedCountry = data.map((countryData) => {
        return {
          name: countryData.name.official,
          common: countryData.name.common,
          nativName: countryData.name.common,
          population: countryData.population,
          region: countryData.region,
          subRegion: countryData.subregion,
          capital: countryData.capital,
          flag: countryData.flags.png,
          topLevel: countryData.tld,
          currencies: Object.keys(countryData.currencies),
          languages: Object.values(countryData.languages),
        };
      });
      console.log(transformedCountry);
      setCountry(transformedCountry);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, [onCountrySelected]);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);
  console.log(country);

  // working
  const cardInfo = country.map((country) => {
    return (
      <Card>
        <img
          className={classes["img-flag"]}
          id={country.common}
          src={country.flag}
          alt="flag"
        />
        <section className={classes["country-info"]}>
          <h1>{country.common}</h1>
          <p>
            <span className={classes.marked}>Official Name:</span>{" "}
            {country.name}
          </p>
          <p>
            <span className={classes.marked}>Population:</span>{" "}
            {country.population}
          </p>
          <p>
            <span className={classes.marked}>Region:</span> {country.region}
          </p>
          <p>
            <span className={classes.marked}>Sub Region:</span>{" "}
            {country.subRegion}
          </p>
          <p>
            <span className={classes.marked}>Capital:</span> {country.capital}
          </p>
        </section>
        <section className={classes["country-info-1"]}>
          <p>
            <span className={classes.marked}>Top Level Domain:</span>{" "}
            {country.topLevel}
          </p>
          <p>
            <span className={classes.marked}>Currencies:</span>{" "}
            {country.currencies}
          </p>
          <p>
            <span className={classes.marked}>Languages:</span>{" "}
            {country.languages}
          </p>
        </section>
        <h2>Border Countries:</h2>
        <div className={classes["border-countries"]}>
          <p></p>
        </div>

        <section></section>
      </Card>
    );
  });
  return (
    <div>
      <button className={classes["back-btn"]} onClick={backBtnHandler}>
        <span class="material-symbols-outlined">arrow_back</span>
        <p>Back</p>
      </button>

      {isLoading && <div className={classes.spinner}></div>}
      {cardInfo}
    </div>
  );
};

export default SingleCard;
