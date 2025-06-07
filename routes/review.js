const express = require("express");
const router = express.Router({ mergeParams: true });

//models
const List = require("../models/list.model.js");
const Review = require("../models/review.model.js");
// schema validations
const reviewSchemaVal = require("../utils/reviewSchemaVal.js");

// review post route
router.post("/", async (req, res, next) => {
  try {
    let result = reviewSchemaVal.validate(req.body);
    if (result.error) next(result.error);
    else {
      let { id } = req.params;
      let { rating, comment } = req.body;
      const review = await Review.create({
        rating,
        comment,
      });
      const list = await List.findOne({ _id: id });
      list.reviews.push(review);
      await list.save();
      res.redirect(`/lists/${id}`);
    }
  } catch (err) {
    next(err);
  }
});

// review delete route

router.post("/:reviewId", async (req, res, next) => {
  try {
    let { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await List.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    res.redirect(`/lists/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
