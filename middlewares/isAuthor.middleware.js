const Review = require("../models/review.model.js");

module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (req.user && !req.user._id.equals(review.author._id)) {
    req.flash("error", "You are not the author.");
    return res.redirect(`/lists/${id}`);
  }
  next();
};
