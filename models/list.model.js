const mongoose = require("mongoose");
const Review = require("./review.model.js");
const Booking = require("./booking.model.js");
const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

listSchema.post("findOneAndDelete", async (list) => {
  if (list.reviews.length) {
    await Review.deleteMany({ _id: { $in: list.reviews } });
  }
  await Booking.deleteMany({ list: list._id });
});

module.exports = mongoose.model("List", listSchema);
