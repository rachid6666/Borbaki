import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: false,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: false,
      },
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: false,
      },
     
      checkin: {
        type: Date,
        required: false,
      },
      checkout: {
        type: Date,
        required: false,
      },
      guests: {
        type: Number,
        required: false,
      },
      totalPrice: {
        type: Number,
        required: false,
      },
      
      status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
        required: false,
      },
  },
  { timestamps: false }
);

export default mongoose.model("booking", BookingSchema);
