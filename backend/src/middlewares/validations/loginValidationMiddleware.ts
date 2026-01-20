import { NextFunction, Request, Response } from "express";
import loginValidation from "../../validations/loginValidation";

const loginValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await loginValidation.validate(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    const errors = err.inner.map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }
};

export default loginValidationMiddleware;
