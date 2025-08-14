
import User from "../model/user.js";
import Hotel from "../model/hotel.js"
import Room from "../model/room.js"
import Booking from "../model/Booking.js";

function calculatePrice(roomPrice, checkin, checkout) {
  const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
  return roomPrice * nights; // Replace with your pricing logic
}


export async function createBooking(req, res) {
  try {
    const { userId, hotelId, roomId, checkin, checkout, guests,status,roomPrice } = req.body;


 
    const totalPrice=roomPrice;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }


    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({ message: "Invalid hotel" });
    }


    const room=roomId;
  


    const booking = new Booking({
      user,
      hotel,
      room,
      checkin,
      checkout,
      guests,
      totalPrice,
      status
 
    });

    await booking.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating booking" });
  }
}

export async function updateBookingStatus(req, res) {
  try {
   
    const bookingId = req.params.id; 

   
    if (!bookingId) {
      return res.status(400).json({ message: "Missing booking ID" });
    }

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

  
    

    
    booking.status = 'confirmed'; 


    
  
  await booking.save();

    res.status(200).json({ message: "Booking confirmed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating booking status",error });
    
  }
  
}
export async function getUserBookings(req, res) {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookings = await Booking.find({ user: id });

    res.status(200).json(bookings );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving bookings", error });
  }
}