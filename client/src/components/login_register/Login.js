import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import "./form.css";
import { loginUser } from "../../api/userApi";
import Spinner from "../spinner/Spinner";
import { UserContext } from "../../App";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      if (res) {
        setLoading(false);
        dispatch({ type: "USER", payload: true });
        // localStorage.setItem("isLogIn", true);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <div className="card">
          <h2 className="form-title">Login</h2>
          <p className="form-text">
            Welcome back! Please enter your details to continue
          </p>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                id="email"
                value={email}
                placeholder="E-Mail"
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="form-button">
              Login
            </button>
          </form>
          <div className="form-link">
            <NavLink to="/signup">New here? Click to register</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
