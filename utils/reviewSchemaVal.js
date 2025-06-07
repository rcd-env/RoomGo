const Joi = require("joi");

const reviewSchema = Joi.object({
  comment: Joi.string().trim().min(1).required().messages({
    "string.empty": `"review" cannot be empty`,
    "string.min": `"review" cannot be just spaces`,
  }),

  rating: Joi.number().min(1).max(5).required(),
});

module.exports = reviewSchema;
