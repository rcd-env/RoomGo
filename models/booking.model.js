const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
