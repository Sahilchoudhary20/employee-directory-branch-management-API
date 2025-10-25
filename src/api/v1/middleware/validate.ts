import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      return res.status(400).json({ success: false, error: error.details.map(d => d.message).join(", ") });
    }
    next();
  };
};
