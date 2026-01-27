import { NextFunction, Request, Response } from "express";
import lectureValidation from "../../validations/lectureValidation";

const lectureValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await lectureValidation.validate(
      { ...req.body, file: req.file },
      {
        abortEarly: false,
      },
    );
    next();
  } catch (err: any) {
    const errors = err.inner.map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ errors });
  }
};

export default lectureValidationMiddleware;
