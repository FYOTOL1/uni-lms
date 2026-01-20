import { NextFunction, Request, Response } from "express";
import signupValidation from "../../validations/signupValidation";

const signupValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await signupValidation.validate(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    const missed = err.inner.map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ message: "some fields are missed!" });
  }
};

export default signupValidationMiddleware;
