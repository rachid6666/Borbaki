import express from 'express';


import { createBooking } from "../controller/book.js";
import {updateBookingStatus} from "../controller/book.js";
import { getUserBookings } from '../controller/book.js';


const router = express.Router();


router.post("/", createBooking);
router.put("/:id",updateBookingStatus);
router.get("/:id",getUserBookings);

export default router;
