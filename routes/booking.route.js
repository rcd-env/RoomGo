const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middlewares/isLoggedIn.middleware");

const {
  createBooking,
  cancelBooking,
} = require("../controllers/booking.controller");

// Create new booking with one click
router.post("/", isLoggedIn, createBooking);

// Cancel a booking
router.post("/cancel/:bookingId", isLoggedIn, cancelBooking);

module.exports = router;
