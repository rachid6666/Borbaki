import React, { useState, useContext } from "react";
import "./noti.css"
import { AuthContext } from "./../../context/AuthContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Siderbar";
import useFetch from "./../../hook/useFetch";
import axios from "axios";

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const { data, error, loading } = useFetch("/notifications");
  
  return (
    <>
      <Navbar />
    
      <div className="list">
        <div className="listContainer">
          <Sidebar />
          <div className="notifications-page">
            {data &&
              data.map((noti) => (
                <div key={noti.id} className="noti-item">
                  <h3>{noti.title}</h3>
                  <p>{noti.message}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Notifications;
