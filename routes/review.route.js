const express = require("express");
const router = express.Router({ mergeParams: true });

// schema vaidation middleware
const {
  validateReview,
} = require("../middlewares/validateReview.middleware.js");
// other middlewares
const { isLoggedIn } = require("../middlewares/isLoggedIn.middleware.js");
const { isAuthor } = require("../middlewares/isAuthor.middleware.js");

// controllers
const {
  createReview,
  destroyReview,
} = require("../controllers/reviews.controller.js");

// review post route
router.post("/", isLoggedIn, validateReview, createReview);

// review delete route

router.post("/:reviewId", isLoggedIn, isAuthor, destroyReview);

module.exports = router;
