import express from 'express';

// order.js controller import
import { processPayment } from "../controller/order.js";


// Import required middleware (if any)

const router = express.Router();

// POST /order/process-payment
router.post("/order", processPayment);

// Export the router
export default router;