import React, { useState } from "react";
import classes from "./header.module.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const modeSwitchHandler = () => {
    setDarkMode((prevMod) => !prevMod);
  };

  return (
    <div className={classes["header-container"]}>
      <h1> Where in the World ? </h1>

      {!darkMode && (
        <div className={classes["mode-switch"]} onClick={modeSwitchHandler}>
          <span className="material-symbols-outlined">dark_mode</span>
          <p>Dark Mode</p>
        </div>
      )}
      {darkMode && (
        <div className={classes["mode-switch"]} onClick={modeSwitchHandler}>
          <span className="material-symbols-outlined">light_mode</span>
          <p>Light Mode</p>
        </div>
      )}
    </div>
  );
};

export default Header;
