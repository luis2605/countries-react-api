import React from "react";
import { Card } from "../ui/Card";
import classes from "./input.module.css";

const Input = () => {
  return (
    <div className={classes["input-container"]}>
      <div className={classes["input-search_container"]}>
        <span class="material-symbols-outlined">search</span>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search for a country..."
          className={classes["input-search"]}
        />
      </div>

      <select className={classes["selector"]} id="simple" name="simple">
        <option>Africa</option>
        <option>America</option>
        <option>Asia</option>
        <option>Europe</option>
        <option>Oceania</option>
      </select>
    </div>
  );
};

export default Input;
