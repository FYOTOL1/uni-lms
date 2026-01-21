import { Request, Response } from "express";
import StudentSchema from "../models/UserSchema";

const getAllStudents = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const getStudent = await StudentSchema.find();
    return res.status(200).json(getStudent);
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { getAllStudents };
