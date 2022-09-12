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

      const transformedCountry = data.map((countryData) => {
        return {
          name: countryData.name.official,
          common: countryData.name.common,
          population: countryData.population,
          region: countryData.region,
          capital: countryData.capital,
          flag: countryData.flags.png,
        };
      });
      console.log(transformedCountry);
      setCountry(transformedCountry);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);

    console.log(error);
  }, [error, onCountrySelected]);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);
  console.log(country);

  // working
  const cardInfo = country.map((country) => {
    return (
      <Card>
        <img id={country.common} src={country.flag} alt="flag" />;
        <section className={classes["country-info"]}>
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
      </Card>
    );
  });
  return (
    <div>
      <button onClick={backBtnHandler}>Back</button>
      <button onClick={fetchCountry}>Back</button>
      {isLoading && <div className={classes.spinner}></div>}
      {cardInfo}
    </div>
  );
};

export default SingleCard;
