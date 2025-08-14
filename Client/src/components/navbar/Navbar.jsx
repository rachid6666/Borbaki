import { useContext, useState } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="no-underline">
          <span className="logo">BorBaki</span>
        </Link>

        {/* Hamburger (only shows on mobile) */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          &#9776;
        </div>

        {user ? (
          <div className={`navItems ${open ? "active" : ""}`}>
            <Link to="/account" className="no-underline">
              <span className="user-nav">Marhaba, {user.username}</span>
            </Link>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={`navItems ${open ? "active" : ""}`}>
            <div className="navItems-center">
              <Link to="/">
                <button className="navButtonHome">Discover</button>
              </Link>
              <Link to="/car-rental">
                <button className="navButtonCarRental">Car rental</button>
              </Link>
              <Link to="/restaurant">
                <button className="navButtonRestaurant">Restaurant</button>
              </Link>
            </div>
            <Link to="/login">
              <button className="navButtonLogin">Login</button>
            </Link>
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
