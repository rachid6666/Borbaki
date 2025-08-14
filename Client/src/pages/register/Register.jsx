import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import countries from "../../countries";
import Navbar from "../../components/navbar/Navbar";
import api from "../config";

const Signup = () => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    phone: "",
    city: "",
    country: "",
    email: "",
    
  });

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setPasswordError(null);
  };

  const handleClick = async (e) => {



    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await api.post("/auth/register", newUser);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      setSuccessMessage("Registration successful!");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });

    }
  };
  useEffect(() => {
    if (successMessage) {
      alert(successMessage);
      navigate("/login");
    }
  }, [successMessage, navigate]);
  return (
    <div>
       <Navbar />
    <div className="signup">
      <div className="sContainer">
        <h3>Create Account</h3>
        {}
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="sInput"
        />
       <div className={`form-group ${passwordError ? "error" : ""}`}>
  <input
    type="password"
    placeholder="Password"
    id="password"
    name="password"
    onChange={handleChange}
    className="sInput"
  />
  {passwordError && <p className="error-message">{passwordError}</p>}
</div>
<div className={`form-group ${passwordError ? "error" : ""}`}>
  <input
    type="password"
    placeholder="Confirm Password"
    id="confirmPassword"
    name="confirmPassword"
    onChange={handleChange}
    className="sInput"
  />
  {passwordError && <p className="error-message">{passwordError}</p>}
</div>

        <input
          type="text"
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          className="sInput"
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="sInput"
        />
       <select
            id="country"
            value={newUser.country}
            onChange={handleChange}
            className="sInput"
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name} </option>
             
              ))}
    </select>

   
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="sInput"
        />
        {}
        <button disabled={loading} onClick={handleClick} className="sButton">
          Sign Up
        </button>
        <Link to="/login" style={{textDecoration: "none", color:"black"}}>
          <p>You already have an account? <span style={{color:"#f2b203"}}>Login</span></p>
        </Link>
        {error && <span className="sSpan">{error.message}</span>}
      </div>
    </div>
    </div>  
  );
};

export default Signup;
