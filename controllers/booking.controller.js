const Booking = require("../models/booking.model");
const List = require("../models/list.model");
const User = require("../models/user.model");
const ExpressError = require("../utils/ExpressError");

// Booking feature with date selection
module.exports.createBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { checkIn, checkOut, totalPrice } = req.body;

    // Find the list
    const list = await List.findById(id);
    if (!list) {
      req.flash("error", "Listing not found");
      return res.redirect("/lists");
    }

    // Parse the dates from the form
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Validate the dates
    if (checkOutDate <= checkInDate) {
      req.flash("error", "Check-out date must be after check-in date");
      return res.redirect(`/lists/${id}`);
    }

    // Calculate total price if not provided
    let finalPrice = totalPrice;
    if (!finalPrice) {
      // If price not from form, calculate it (fallback)
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      finalPrice = Math.round(list.price * nights * 1.18);
    }

    // Create new booking
    const booking = new Booking({
      list: list._id,
      user: req.user._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalPrice: finalPrice,
    });

    await booking.save();

    // Flash success message
    const startDate = checkInDate.toLocaleDateString();
    const endDate = checkOutDate.toLocaleDateString();
    req.flash(
      "success",
      `You've booked ${list.title} from ${startDate} to ${endDate}. Check your profile for details.`
    );
    res.redirect(`/lists/${id}`);
  } catch (err) {
    next(err);
  }
};

// Get user bookings and hosted listings for profile page
module.exports.getUserBookings = async (req, res, next) => {
  try {
    // Get user bookings
    const bookings = await Booking.find({ user: req.user._id })
      .populate("list")
      .sort({ createdAt: -1 });

    // Get user's hosted listings
    const hostedSpots = await List.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.render("users/profile", { bookings, hostedSpots });
  } catch (err) {
    next(err);
  }
};

// Cancel booking (deletes the booking from the database)
module.exports.cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      req.flash("error", "Booking not found");
      return res.redirect("/profile");
    }

    // Check if the booking belongs to the user
    if (!booking.user.equals(req.user._id)) {
      req.flash("error", "You don't have permission to cancel this booking");
      return res.redirect("/profile");
    }

    // Delete the booking instead of changing status
    await Booking.findByIdAndDelete(bookingId);

    req.flash("success", "Booking cancelled successfully");
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
};

// Get booking details and redirect to list page
module.exports.getBookingDetails = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).populate("list");

    if (!booking) {
      req.flash("error", "Booking not found");
      return res.redirect("/profile");
    }

    // Check if the booking belongs to the user
    if (!booking.user.equals(req.user._id)) {
      req.flash("error", "You don't have permission to view this booking");
      return res.redirect("/profile");
    }

    // Redirect to the list page instead of showing booking details
    req.flash("success", "Viewing property details for your booking");
    res.redirect(`/lists/${booking.list._id}`);
  } catch (err) {
    next(err);
  }
};
