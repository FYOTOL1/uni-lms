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

const signupUser = async (
  req: Request,
  res: Response,
): Promise<Response<any, Record<string, any>>> => {
  try {
    const body: IUserSchema = req.body;

    const hashedUserPassword = await argon2.hash(body.password);
    body.password = hashedUserPassword;

    const getUserByEmail = await UserSchema.findOne({
      email: body.email,
    });
    const getUserByCode = await UserSchema.findOne({
      userCode: body.userCode,
    });

    if (getUserByEmail || getUserByCode)
      return res
        .status(409)
        .json({ message: "email or User code already exists!" });

    const createUser: IUserSchema = await UserSchema.create(body);

    const accessToken = accessTokenGenerator(
      createUser._id,
      createUser.userName,
      createUser.role,
      createUser.userGroup,
      createUser.permissions,
    );

    const refreshToken = refreshTokenGenerator(
      createUser._id,
      createUser.userName,
      createUser.role,
      createUser.userGroup,
      createUser.permissions,
    );

    sendTokenCookie(res, "refreshToken", refreshToken);
    sendTokenCookie(res, "accessToken", accessToken);

    return res.status(201).json({
      message: "User created successfully",
      User: { userName: createUser.userName },
    });
  } catch (error: any) {
    console.log("authControllerFile: " + error.message + " req: ");

    return res
      .status(500)
      .json({ message: "internal server error", req: req.body });
  }
};

const loginUser = async (
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
        findUser.userGroup,
        findUser.permissions,
      );
      const accessToken = accessTokenGenerator(
        findUser._id,
        findUser.userName,
        findUser.role,
        findUser.userGroup,
        findUser.permissions,
      );

      sendTokenCookie(res, "refreshToken", refreshToken);
      sendTokenCookie(res, "accessToken", accessToken);

      return res.status(200).json({ message: "Logged Successfully!" });
    }

    return res.status(404).json({ message: "User code incorrect!" });
  } catch (error) {
    console.log("authControllerFile: " + error);

    return res.status(500).json({ message: "internal server error" });
  }
};

const logoutUser = async (req: Request, res: Response) => {
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

const getUserData = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "unauthorized!" });
  }

  return res.status(200).json({
    user: req.user,
  });
};

export { signupUser, loginUser, logoutUser, getUserData };
