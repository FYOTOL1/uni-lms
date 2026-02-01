import { Request, Response } from "express";
import UserSchema from "../models/UserSchema";

const getAllStudents = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const getStudent = await UserSchema.find();
    return res.status(200).json({ message: "Successfully", users: getStudent });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { getAllStudents };
