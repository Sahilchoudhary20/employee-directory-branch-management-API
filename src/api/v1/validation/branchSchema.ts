import Joi from "joi";

export const createBranchSchema = Joi.object({
  name: Joi.string().min(2).max(150).required(),
  address: Joi.string().min(5).max(300).required(),
  phone: Joi.string().pattern(/^[0-9\-\s\+()]{5,20}$/).required()
});

export const updateBranchSchema = Joi.object({
  name: Joi.string().min(2).max(150),
  address: Joi.string().min(5).max(300),
  phone: Joi.string().pattern(/^[0-9\-\s\+()]{5,20}$/)
}).min(1);
