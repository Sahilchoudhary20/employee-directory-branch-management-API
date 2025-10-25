import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  position: Joi.string().min(2).max(100).required(),
  department: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9\-\s\+()]{5,20}$/).required(),
  branchId: Joi.alternatives().try(Joi.string(), Joi.number()).required()
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  position: Joi.string().min(2).max(100),
  department: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9\-\s\+()]{5,20}$/),
  branchId: Joi.alternatives().try(Joi.string(), Joi.number())
}).min(1); // require at least one field to update
