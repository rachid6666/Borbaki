import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faBell,faCalendarCheck,faTicketAlt   } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="ct-client">
        <ul className="ul-client">
          <Link to="/account" style={{ textDecoration: "none" }}>
            <li className="si-client">
            <FontAwesomeIcon icon={faUser} />
              <span className="span-client">  Your infomation</span>
            </li>
          </Link>
       {/* 
        <Link to="/tickets" style={{ textDecoration: "none" }}>
            <li className="si-client">
            <FontAwesomeIcon icon={faTicketAlt} />
              <span className="span-client">  Your Ticket</span>
            </li>
          </Link>
       */}  <Link to="/bookings" style={{ textDecoration: "none" }}>
          <li className="si-client">
          <FontAwesomeIcon icon={faCalendarCheck} />
            <span className="span-client">  Your Bookings</span>
          </li>
          </Link>
          <Link to="/notifications" style={{ textDecoration: "none" }}>
            <li className="si-client">
            <FontAwesomeIcon icon={faBell} /> 
              <span className="span-client">  Notifications</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
