import { useState } from "react";
import "./App.css";
import CountriesDisplay from "./components/CountriesDisplay";
import Header from "./components/Header";
import Input from "./components/Input";
import SingleCard from "./components/SingleCard";

function App() {
  const [region, setRegion] = useState("");
  const [individualCountry, setIndividualCountry] = useState("");
  const [isCountrySelected, setIsCountrySelected] = useState(false);

  const [singleCountryCard, setSingleCountryCard] = useState(true);
  const [countrySelected, setCountrySelected] = useState("");

  const onSetRegionHandler = (value) => {
    setRegion((prevRegion) => value);
    setIndividualCountry("");
    setIsCountrySelected(false);
  };

  const onSetIndividualCountry = (value) => {
    setIndividualCountry((prevCountry) => value);
    setIsCountrySelected(true);
  };
  const singleCountryCardHandler = (value, value1) => {
    setSingleCountryCard((prev) => value);
    setCountrySelected((prev) => value1);
  };
  const secondSingleCountryCardHandler = (value) => {
    setSingleCountryCard((pre) => value);
  };
  console.log(countrySelected);
  return (
    <div className="App">
      <Header />
      {singleCountryCard && (
        <Input
          onSetRegion={onSetRegionHandler}
          onSetIndividualCountry={onSetIndividualCountry}
          onIsCountrySelected={isCountrySelected}
        />
      )}
      {singleCountryCard && (
        <CountriesDisplay
          onSingleCountry={singleCountryCardHandler}
          onRegion={region}
          onCountry={individualCountry}
          onIsCountrySelected={isCountrySelected}
        />
      )}
      {!singleCountryCard && (
        <SingleCard
          onSingleCountry={secondSingleCountryCardHandler}
          onCountrySelected={countrySelected}
        />
      )}
    </div>
  );
}

export default App;
