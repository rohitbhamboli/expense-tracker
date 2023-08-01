import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { registerUser } from "../../api/userApi";
import "./form.css";
import Spinner from "../spinner/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    cpassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = await registerUser(user);
      if (userData) {
        setLoading(false);
        navigate("/login");
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
          <h2 className="form-title">Register</h2>
          <p className="form-text">
            Welcome! Please enter your details to register
          </p>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                placeholder="Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <i className="fa-solid fa-phone"></i>
              <input
                type="tele"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <i className="fa-solid fa-briefcase"></i>
              <input
                type="text"
                id="profession"
                name="profession"
                placeholder="Profession"
                value={user.profession}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                id="cpassword"
                name="cpassword"
                placeholder="Confirm Password"
                value={user.cpassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="form-button">
              Register
            </button>
          </form>
          <div className="form-link">
            <NavLink to="/login">Already registered? Log In</NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
