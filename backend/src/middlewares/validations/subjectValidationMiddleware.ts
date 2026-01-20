import { NextFunction, Request, Response } from "express";
import subjectValidation from "../../validations/subjectValidation";

const subjectValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await subjectValidation.validate(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    const errors = error.inner.map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }
};

export default subjectValidationMiddleware;
