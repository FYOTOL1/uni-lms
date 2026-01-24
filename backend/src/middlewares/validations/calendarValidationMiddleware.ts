import { NextFunction, Request, Response } from "express";
import calendarValidation from "../../validations/calendarValidation";

const calendarValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await calendarValidation.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err: any) {
    const errors = err.inner.map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }
};

export default calendarValidationMiddleware;
