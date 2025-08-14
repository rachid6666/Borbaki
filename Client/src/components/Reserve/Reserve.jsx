import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hook/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const [pricEx, setPriceEx] = useState(0);
  const [sendTotaPrice, setSendTotalPrice] = useState(0);



  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };


  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);


  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };



  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;



    const values = value.split(",");
    const id = values[0];
    setPriceEx(values[1]);




    setSelectedRooms(
      checked
        ? [...selectedRooms, id]

        : selectedRooms.filter((item) => item !== id)
    );





  };
  const calculateTotalPrice = (pricePerNight, numNights) => {
    setSendTotalPrice(pricePerNight * numNights)
    return pricePerNight * numNights;
  };


  const handleClick = async () => {
    if (selectedRooms.length === 0) {
      // Handle no rooms selected case (optional)
      alert("Please select at least one room to reserve.");
      return;
    }

    // Prepare booking data
    const bookingData = {
      userId: user._id,
      hotelId, // Assuming you have hotelId available
      roomId: selectedRooms[0], // Assuming you want to book the first selected room

      checkin: dates[0].startDate,
      checkout: dates[0].endDate,
      guests: options.adult,
      status: "pending",
      roomPrice: calculateTotalPrice(pricEx, days),
    };
    // Send booking request to backend using axios.post
    const response = await axios.post("/book/", bookingData);

    try {
      await Promise.all(
        selectedRooms.map((roomId) =>
          axios.put(`/rooms/availability/${roomId}`, { dates: alldates })
        )
      );

      if (response.status === 201) { // Check for successful creation
        // console.log("Booking created successfully:", response.data);
        const myString = JSON.stringify(response.data);
        localStorage.setItem('booking', myString);

        

        setOpen(false);
        navigate("/checkout"); // Redirect to checkout page
      } else {
        console.error("Booking creation failed:", response.data);
        // Handle booking creation failure (optional)
        alert("An error occurred while creating your booking. Please try again.");
      }
      //setOpen(false);
      //navigate("/checkout");
    } catch (err) {
      console.error("Reservation failed:", err);
    }

  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span className="Title">Choose your room:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">

                Max people: <b>{item.maxPeople}</b>
              </div>

              <div className="rPrice">Price: €{item.price}</div>

            </div>
            <div className="rSelectRooms">
              Rooms:
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={[roomNumber._id, roomNumber.price]}
                    data-roomNumber={roomNumber}
                    onChange={(e) => handleSelect(e)}
                    disabled={!isAvailable(roomNumber)}

                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
