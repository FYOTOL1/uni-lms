import { NextFunction, Request, Response } from "express";
import updateUserValidation from "../../validations/updateUserValidation";

const updateUserValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await updateUserValidation.validate(req.body, {
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

export default updateUserValidationMiddleware;
