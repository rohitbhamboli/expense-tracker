import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-container-title">
          Welcome to the
          <h1>Expense Tracker</h1>
        </div>
        <div className="home-container-btn">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Register</NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
