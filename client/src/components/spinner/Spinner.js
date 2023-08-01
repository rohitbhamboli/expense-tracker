import React from "react";
import spinner from "./spinner.gif";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img src={spinner} alt="loading" />
    </div>
  );
};

export default Spinner;
