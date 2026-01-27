import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import de from "dotenv";
import { IUserSchema } from "../types/UserSchemaTypes";
import { TMeRequest, TPermissions } from "../types/AuthTypes";
import UserSchema from "../models/UserSchema";

de.config();

declare global {
  namespace Express {
    interface Request {
      user?: TMeRequest;
    }
  }
}

export const accessTokenGenerator = (
  _id: string,
  userName: string,
  role: "admin" | "subadmin" | "student",
  userGroup: string,
  permissions: TPermissions,
) => {
  const token = jwt.sign(
    {
      _id,
      userName,
      role,
      userGroup,
      permissions,
    },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: "30m",
    },
  );

  return token;
};

export const refreshTokenGenerator = (
  _id: string,
  userName: string,
  role: "admin" | "subadmin" | "student",
  userGroup: string,
  permissions: TPermissions,
) => {
  const token = jwt.sign(
    {
      _id,
      userName,
      role,
      userGroup,
      permissions,
    },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    },
  );

  return token;
};

export const sendTokenCookie = (
  res: Response,
  tokenName: "accessToken" | "refreshToken",
  token: string,
) => {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24,
  });
};

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.cookies?.refreshToken;
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "not authenticated " });
  }

  if (!refreshToken)
    return res.status(401).json({ message: "not authenticated " });

  try {
    const decodeRefreshToken = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!,
    ) as IUserSchema;

    try {
      const decodeAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET!,
      );
      req.user = decodeAccessToken as TMeRequest;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        const user = await UserSchema.findOne({ _id: decodeRefreshToken._id });
        if (!user) return res.status(404).json({ message: "User Not Found!" });
        const newAccessToken = accessTokenGenerator(
          user._id,
          user.userName,
          user.role,
          user.userGroup,
          user.permissions,
        );
        sendTokenCookie(res, "accessToken", newAccessToken);
        next();
      } else {
        res.status(500).json({ message: "server internal error!" });
      }
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "unauthorized user!" });
    } else {
      res.status(500).json({ message: "server internal!" });
    }
  }
};

export default authMiddleware;
