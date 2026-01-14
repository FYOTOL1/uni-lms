import { Request, Response } from "express";
import { IStudentSchema } from "../types/StudentSchemaTypes";
import argon2 from "argon2";
import dotenv from "dotenv";
import StudentSchema from "../models/StudentSchema";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
  sendTokenCookie,
} from "../middlewares/authMiddleware";

dotenv.config();

const signupStudent = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const body: IStudentSchema = req.body;

    const hashedStudentPassword = await argon2.hash(body.password);
    body.password = hashedStudentPassword;

    const getStudentByEmail = await StudentSchema.findOne({
      email: body.email,
    });
    const getStudentByCode = await StudentSchema.findOne({
      studentCode: body.studentCode,
    });

    if (getStudentByEmail || getStudentByCode)
      return res
        .status(409)
        .json({ message: "email or student code already exists!" });

    const createdStudent: IStudentSchema = await StudentSchema.create(body);

    const accessToken = accessTokenGenerator(
      createdStudent._id,
      createdStudent.role
    );

    const refreshToken = refreshTokenGenerator(
      createdStudent._id,
      createdStudent.role
    );

    sendTokenCookie(res, "refreshToken", refreshToken);
    sendTokenCookie(res, "accessToken", accessToken);

    return res.status(201).json({
      message: "Student created successfully",
      student: { studentName: createdStudent.studentName },
    });
  } catch (error: any) {
    console.log("authControllerFile: " + error);

    return res.status(500).json({ message: "internal server error" });
  }
};

const loginStudent = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { studentCode, password }: { studentCode: number; password: string } =
      req.body;

    const findUser = (await StudentSchema.findOne({
      studentCode,
    })) as IStudentSchema;

    if (findUser) {
      const hashedPassword = findUser.password;
      const verifyPassword = await argon2.verify(hashedPassword, password);

      if (!verifyPassword)
        return res.status(400).json({ message: "Incorrect Password!" });

      const refreshToken = refreshTokenGenerator(findUser._id, findUser.role);
      const accessToken = accessTokenGenerator(findUser._id, findUser.role);

      sendTokenCookie(res, "refreshToken", refreshToken);
      sendTokenCookie(res, "accessToken", accessToken);

      return res.status(200).json({ message: "Logged Successfully!" });
    }

    return res.status(404).json({ message: "student code incorrect!" });
  } catch (error) {
    console.log("authControllerFile: " + error);

    return res.status(500).json({ message: "internal server error" });
  }
};

const logoutStudent = async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({ message: "logged out successfully!" });
};

const getStudentData = (req: Request, res: Response) => {
  if (!req.student) {
    return res.status(401).json({ message: "unauthorized" });
  }

  return res.status(200).json({
    student: req.student,
  });
};

export { signupStudent, loginStudent, logoutStudent, getStudentData };
