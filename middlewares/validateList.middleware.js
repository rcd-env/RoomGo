const Joi = require("joi");
const ExpressError = require("../utils/ExpressError.js");

const listSchemaVal = Joi.object({
  title: Joi.string().trim().min(1).required().messages({
    "string.empty": `"title" cannot be empty`,
    "string.min": `"title" cannot be just spaces`,
  }),
  description: Joi.string().trim().min(1).required().messages({
    "string.empty": `"description" cannot be empty`,
    "string.min": `"description" cannot be just spaces`,
  }),
  price: Joi.number().min(1000).required().messages({
    "number.base": `"price" must be a number`,
    "number.min": `"price" must be at least 1000`,
    "any.required": `"price" is required`,
  }),
  location: Joi.string().trim().min(1).required().messages({
    "string.empty": `"location" cannot be empty`,
    "string.min": `"location" cannot be just spaces`,
  }),
  country: Joi.string().trim().min(1).required().messages({
    "string.empty": `"country" cannot be empty`,
    "string.min": `"country" cannot be just spaces`,
  }),
});

module.exports.validateList = (req, res, next) => {
  let result = listSchemaVal.validate(req.body);
  if (result.error) return next(result.error);
  // if (!req.file) {
  //   return next(new ExpressError("400", `"image" file is required`));
  // }
  next();
};
