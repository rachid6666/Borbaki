import React, { useState, useContext } from "react";
import "./ticket.css";
import { AuthContext } from "./../../context/AuthContext";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Siderbar";
import useFetch from "./../../hook/useFetch";
import axios from "axios";

const Ticket = () => {
  const { user } = useContext(AuthContext);
  const { data, error, loading } = useFetch("/tickets/all");
  const [info, setInfo] = useState({});
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newTicket = {
        ...info,
      };
      await axios.post("/tickets", newTicket);
    } catch (err) {}
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Navbar />
     
      <div className="list">
        <div className="listContainer">
          <Sidebar />
          <div className="ticket-page">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <table className="ticket-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((ticket) => (
                      <tr key={ticket.id}>
                        <td>{ticket.title}</td>
                        <td>{ticket.content}</td>
                        <td>{ticket.status}</td>
                        <td>{ticket.createdAt}</td>
                        <td>{ticket.updatedAt}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
            <button className="button-ticket" onClick={toggleForm}>Create New Ticket</button>

            {showForm && (
              <form onSubmit={handleClick}>
                <h2>Create a New Ticket</h2>
                <label>
                  Title:
                  <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Content:
                  <textarea
                    name="content"
                    id="content"
                    onChange={handleChange}
                  ></textarea>
                </label>
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Ticket;
