import React, { useState, useContext, useEffect } from "react";
import "./bookings.css"; 
import { DataGrid } from "@mui/x-data-grid";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Siderbar";
import axios from "axios";
import useFetch from "../../hook/useFetch";
const Bookings = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/book/${user._id}`); // Use destructuring
  const [isLoading, setIsLoading] = useState(false); 
  const bookings = data || [];
  
  const columns = [
    { field: "_id", headerName: "Confirmation ID", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "hotel", headerName: "Hotel", width: 200 }, // Assuming hotelName is present in data
    {
      field: "checkin",
      headerName: "Check-in",
      width: 150,
      type: "date", // Set data type for proper formatting
    },
    {
      field: "checkout",
      headerName: "Check-out",
      width: 150,
      type: "date", // Set data type for proper formatting
    },
    { field: "totalPrice", headerName: "Total Price", width: 120 },
  ];
 
  const getRowId = (row) => row._id;
  return (
    <>
    <Navbar />
    <div className="list">
      <div className="listContainer">
        <Sidebar />
        <div className="booking-list">
          <h1>My Booking</h1>
          {loading ? ( // Display loading message while fetching data
            <p>Loading bookings...</p>
          ) : error ? (
            <p>Error fetching bookings: {error.message}</p>
          ): (
            /* Fixed conditional rendering: */
            data.length>0 ? (
                <div className="booking-data-grid">
            <DataGrid
              rows={bookings}
              columns={columns}
              pageSize={5} // Set initial page size (optional)
              rowsPerPageOptions={[5, 10, 20]} // Set available page sizes (optional)
              autoHeight 
              getRowId={getRowId} 
              style={{border:"border-raduis:20px"}}
            />
                  </div>
            ) : (
              <p>You don't have any bookings yet.</p>
            )
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  </>);
};

export default Bookings;
