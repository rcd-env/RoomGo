const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middlewares/isLoggedIn.middleware");

const {
  createBooking,
  cancelBooking,
  getBookingDetails,
} = require("../controllers/booking.controller");

// Create new booking with one click
router.post("/", isLoggedIn, createBooking);

// Cancel a booking
router.post("/cancel/:bookingId", isLoggedIn, cancelBooking);

// Get booking details
router.get("/:bookingId", isLoggedIn, getBookingDetails);

module.exports = router;
