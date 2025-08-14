import React, { useState, useContext, useEffect } from "react";
import "./account.css";
import { AuthContext } from "./../../context/AuthContext";
import Footer from "../../components/footer/Footer";  
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Siderbar";
import axios from "axios";
import api from "../../config";

const Account = () => {
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    setInfo({
      username: user.username || "",
      email: user.email || "",
      country: user.country || "",
      phone: user.phone || "",
      img: user.img || "",
    });
  }, [user]);

  const handleClick = async (e) => {
    e.preventDefault();
    let imageUrl = info.img; 

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");

      try {
        const uploadRes = await api.post(
          "https://api.cloudinary.com/v1_1/dfsarmr16/image/upload",
          data
        );

        const { url } = uploadRes.data;
        imageUrl = url; 
      } catch (err) {
        console.log(err);
      }
    }

    const updateUser = {
      username: info.username,
      email: info.email,
      country: info.country,
      phone: info.phone,
      img: imageUrl,
    };

    try {
       await api.post("/users/${user._id}", updateUser);
     
    } catch (err) {
     
      if (err.response && err.response.status === 401) {
        // redirect to login page
        window.location.href = "/Login";
      
      console.log(err);}
      
    }
  };

  return (
    <>
      <Navbar />
     
      <div className="list">
        <div className="listContainer">
          <Sidebar />
          <div className="account-page">
            <input
              className="ip-acc"
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={info.username}
              onChange={handleChange}
            />
            <input
              className="ip-acc"
              type="text"
              name="email"
              id="email"
              placeholder="email"
              value={info.email}
              onChange={handleChange}
            />
            <input
              className="ip-acc"
              type="text"
              id="country"
              placeholder="your country"
              value={info.country}
              onChange={handleChange}
            />
            <input
              className="ip-acc"
              type="text"
              name="phone"
              id="phone"
              placeholder="your phone"
              value={info.phone}
              onChange={handleChange}
            />
            {user.image && (
              <img
                src={URL.createObjectURL(info.image)}
                alt="Avatar"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <div className="user-img">
              <img src={info.img} alt="Avatar" className="avatar" />

              <input
                className="ip-acc"
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button className="btn-acc" onClick={handleClick}>
              Update
            </button>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Account;
