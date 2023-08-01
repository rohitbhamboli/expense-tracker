import React, { createContext, useReducer } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Register from "./components/login_register/Register";
import Login from "./components/login_register/Login";
import Income from "./components/exp_inc/Income";
import Expense from "./components/exp_inc/Expense";
import { initialState, reducer } from "./reducer/reducer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./main.css";
export const UserContext = createContext();
function App() {
  const loggedInUser = localStorage.getItem("isLogIn");
  const [state, dispatch] = useReducer(reducer, loggedInUser || initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
