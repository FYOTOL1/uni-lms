import { Request, Response } from "express";
import argon2 from "argon2";
import dotenv from "dotenv";
import UserSchema from "../models/UserSchema";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
  sendTokenCookie,
} from "../middlewares/authMiddleware";
import { IUserSchema } from "../types/UserSchemaTypes";

dotenv.config();

const signupStudent = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const body: IUserSchema = req.body;

    const hashedStudentPassword = await argon2.hash(body.password);
    body.password = hashedStudentPassword;

    const getStudentByEmail = await UserSchema.findOne({
      email: body.email,
    });
    const getStudentByCode = await UserSchema.findOne({
      userCode: body.userCode,
    });

    if (getStudentByEmail || getStudentByCode)
      return res
        .status(409)
        .json({ message: "email or student code already exists!" });

    const createUser: IUserSchema = await UserSchema.create(body);

    const accessToken = accessTokenGenerator(
      createUser._id,
      createUser.userName,
      createUser.role,
    );

    const refreshToken = refreshTokenGenerator(
      createUser._id,
      createUser.userName,
      createUser.role,
    );

    sendTokenCookie(res, "refreshToken", refreshToken);
    sendTokenCookie(res, "accessToken", accessToken);

    return res.status(201).json({
      message: "Student created successfully",
      student: { userName: createUser.userName },
    });
  } catch (error: any) {
    console.log("authControllerFile: " + error);

    return res.status(500).json({ message: "internal server error" });
  }
};

const loginStudent = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { userCode, password }: { userCode: number; password: string } =
      req.body;

    const findUser = (await UserSchema.findOne({
      userCode,
    })) as IUserSchema;

    if (findUser) {
      const hashedPassword = findUser.password;
      const verifyPassword = await argon2.verify(hashedPassword, password);

      if (!verifyPassword)
        return res.status(400).json({ message: "Incorrect Password!" });

      const refreshToken = refreshTokenGenerator(
        findUser._id,
        findUser.userName,
        findUser.role,
      );
      const accessToken = accessTokenGenerator(
        findUser._id,
        findUser.userName,
        findUser.role,
      );

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
  if (!req.user) {
    return res.status(401).json({ message: "unauthorized!" });
  }

  return res.status(200).json({
    user: req.user,
  });
};

export { signupStudent, loginStudent, logoutStudent, getStudentData };
