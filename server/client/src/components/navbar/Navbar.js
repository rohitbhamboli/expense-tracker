import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import { logOutUser } from "../../api/userApi";
import { UserContext } from "../../App";

const Navbar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [click, setclick] = useState(false);

  const handleLogOut = async () => {
    try {
      const res = await logOutUser();
      if (res.status === 200 || res.status === 304) {
        dispatch({ type: "USER", payload: false });
        localStorage.setItem("isLogIn", false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setclick(!click);
  };

  const RenderMenu = () => {
    if (localStorage.getItem("isLogIn") === "true") {
      return (
        <>
          <li>
            <NavLink onClick={handleLogOut} to="#">
              Log Out
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/login">Log In</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Register</NavLink>
          </li>
        </>
      );
    }
  };
  return (
    <nav className="navbar">
      <h2>Expense Tracker</h2>
      <div className="menu-icon" onClick={handleClick}>
        <i className={click ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>
      <ul className={click ? "nav-menu open" : "nav-menu"}>
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/income">Income</NavLink>
        </li>
        <li>
          <NavLink to="/expense">Expense</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
        <RenderMenu />
      </ul>
    </nav>
  );
};

export default Navbar;
