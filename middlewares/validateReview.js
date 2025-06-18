const Joi = require("joi");

const reviewSchemaVal = Joi.object({
  comment: Joi.string().trim().min(1).required().messages({
    "string.empty": `"review" cannot be empty`,
    "string.min": `"review" cannot be just spaces`,
  }),

  rating: Joi.number().min(1).max(5).required(),
});

module.exports.validateReview = (req, res, next) => {
  let result = reviewSchemaVal.validate(req.body);
  if (result.error) return next(result.error);
  next();
};
