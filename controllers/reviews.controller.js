const Review = require("../models/review.model.js");
const List = require("../models/list.model.js");

module.exports.createReview = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { rating, comment } = req.body;
    const review = await Review.create({
      rating,
      comment,
      author: req.user,
    });
    const list = await List.findOne({ _id: id });
    list.reviews.push(review);
    await list.save();
    req.flash("success", "Review Added Successfully.");
    res.redirect(`/lists/${id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.destroyReview = async (req, res, next) => {
  try {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "Review Deleted Successfully.");
    res.redirect(`/lists/${id}`);
  } catch (error) {
    next(error);
  }
};
