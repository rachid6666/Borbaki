import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import "./Checkout.css";
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';


const Checkout = () => {
  
  const [TotalingPrice, setTotalingPrice] = useState(null);
  const[confirmationID,setconfirmationID] = useState(null);
  const[checkin,setCheckin] = useState(null);
  const[checkout,setCheckout] = useState(null);

  useEffect(() => {
    const storedTotalPriceString = localStorage.getItem('booking');

    if (storedTotalPriceString) {
      try {
        const storedTotalPrice = JSON.parse(storedTotalPriceString);
        setTotalingPrice(storedTotalPrice?.booking?.totalPrice);
        setconfirmationID(storedTotalPrice?.booking?._id);
        setCheckin((new Date(storedTotalPrice?.booking?.checkin)).toLocaleDateString('fr-FR'));
        setCheckout((new Date(storedTotalPrice?.booking?.checkout)).toLocaleDateString('fr-FR'));
       
        
      } catch (error) {
        console.error('Error parsing booking data:', error);
        
      }
    }
  }, []);


  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const { data } = useLocation();

 
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {

    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dates ? dayDifference(dates[0].endDate, dates[0].startDate) : 0;


  const cheapestPrice = data && data.cheapestPrice ? data.price.$numberInt : 'Price unavailable';

  //const totalPrice = days * cheapestPrice * options.room;

  const handleClick = async () => {
    



  try {
    const response = await axios.put(`/book/${confirmationID}`);

    if (response.status === 200) {
      console.log('Booking confirmed successfully!');
      toast.success('Booking Confirmed!', {confirmationID});
      
    const emailData = {
      service_id: 'service_f24luwm',
      template_id: 'template_9zg389a',
      confirmationID:confirmationID,
      from_name: 'Dz Tourism platform',
      to_name: user.username,
      to_email: user.email,
      subject: 'Booking Confirmation',
      nights: days,
      checkin:checkin,
      checkout:checkout,
      rooms: options.room,

      totalPrice: TotalingPrice,
    };
    emailjs
      .send('service_f24luwm', 'template_9zg389a', emailData, '7QOTVeSMw_AHbmAlj')
      .then((response) => {
        console.log('EMAIL SENT!', response.status, response.text);


        toast.success('Email Sent Successfully!', {
          position: "top-center",
          autoClose: 5000,
          theme: 'dark',
          hideProgressBar: false,
          closeOnClick: true,
          toastId: 'confirmation',
        });
      })
      .catch((err) => {
        console.error('EMAIL ERROR', err);

        {
          toast.error('Error Sending Email!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        }
      });
    } else {
      console.error('Error confirming booking:', response.data);
      toast.error('Error Confirming Booking!', {
        
      });
    }
  } catch (error) {
    console.error('Error sending confirmation request:', error);
    toast.error('Error Confirming Booking!', {
      
    });
  }





  };
  const navigate = useNavigate();

  const handleCancel = () => {
    localStorage.removeItem('booking');
    navigate('/');
  };
  return (
    <>
    <Navbar></Navbar>
   
    <div className="container">
      
      <div className='checkout'>
        <h1>Confirmation</h1>
        {confirmationID !== null ? (
            <>
             <p><span> Confirmation ID :</span> {confirmationID}</p>
              
            </>
          ) : (
            <></>
          )}
        <p><span> Name :</span> {user ? user.username : ''}</p>
        <p><span> Email : </span>{user ? user.email : ''}</p>
        <p><span> Number of Nights : </span>{days}</p>
        <p><span> Number of Adults : </span>{options.adult}</p>
        <p><span> Number of Childern : </span>{options.children}</p>
        <p><span> Number of Rooms :</span> {options ? options.room : 0}</p>
        <p><span> Check-in : </span>{checkin}</p>
        <p><span> Check-out: </span>{checkout}</p>
        <p>
          <span>Total Amount :</span>
          {TotalingPrice !== null ? (
            <>
              {TotalingPrice}€
            </>
          ) : (
            <></>
          )}
        </p>
        <ToastContainer />
        <p><span>By click into confirm your reservation will Confirmed</span></p>
        <button onClick={handleClick}>Confirm</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
    </>
  );
};

export default Checkout;
