import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import Navbar from "../../components/navbar/Navbar";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const [attempts, setAttempts] = useState(0);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setAttempts(0);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (attempts >= 5) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Login attempts exceeded. Try again later." });
      return; // Prevent login request
    }

  setAttempts(attempts + 1); 
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      alert('LOGIN_FAILUR Please try again')
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div>
 <Navbar />

    <div className="login">
    
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
          <div className="error"> 
        {error && <span>{error.message}</span>}
        {attempts >= 5 && <p>Login attempts exceeded. Try again later.</p>}
        </div>
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading|| attempts >= 5} onClick={handleClick} className="lButton">
          Login
        </button>
        <Link to="/register" style={{textDecoration: "none"}}>
          <p className="para">You don't have an account? <span className="register">Register</span></p>
        </Link>
       
      
      </div>
    </div>
    </div>  
  );
};

export default Login;