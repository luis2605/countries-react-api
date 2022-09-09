import React, { useEffect, useState, useCallback } from "react";
import classes from "./countriesDisplay.module.css";
import { Card } from "../ui/Card";

const CountriesDisplay = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    const transformedCountries = data.map((country) => {
      return {
        name: country.name.official,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flag: country.flags.png,
      };
    });

    setCountries(transformedCountries);
  };

  console.log(countries);
  const cardInfo = countries.map((country) => {
    return (
      <Card>
        <img src={country.flag} alt="flag" />;
        <section className={classes["country-info"]}>
          <h1>{country.name}</h1>
          <p>Population: {country.population}</p>
          <p>Region: {country.region}</p>
          <p>Capital: {country.capital}</p>
        </section>
      </Card>
    );
  });
  return <div>{cardInfo}</div>;
};

export default CountriesDisplay;
