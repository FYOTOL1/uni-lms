import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import de from "dotenv";
import { IUserSchema } from "../types/UserSchemaTypes";

de.config();

type TStudentRequest = {
  _id: string;
  userName: string;
  role: "admin" | "subadmin" | "student";
};

declare global {
  namespace Express {
    interface Request {
      user?: TStudentRequest;
    }
  }
}

export const accessTokenGenerator = (
  _id: string,
  userName: string,
  role: "student" | "subadmin" | "admin",
) => {
  const token = jwt.sign(
    {
      _id,
      userName,
      role,
    },
    process.env.JWT_ACCESS_SECRET!,
    {
      expiresIn: "10m",
    },
  );

  return token;
};

export const refreshTokenGenerator = (
  _id: string,
  userName: string,
  role: "student" | "subadmin" | "admin",
) => {
  const token = jwt.sign(
    {
      _id,
      userName,
      role,
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

  if (!refreshToken)
    return res.status(401).json({ message: "no refresh token passed!" });

  if (!accessToken) {
    return res.status(401).json({ message: "no access token passed!" });
  }

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
      req.user = decodeAccessToken as TStudentRequest;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        const newAccessToken = accessTokenGenerator(
          decodeRefreshToken._id,
          decodeRefreshToken.userName,
          decodeRefreshToken.role,
        );
        sendTokenCookie(res, "accessToken", newAccessToken);
        next();
      } else {
        res.status(500).json({ message: "server internal!" });
      }
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ message: "unauthorized student!" });
    } else {
      res.status(500).json({ message: "server internal!" });
    }
  }
};

export default authMiddleware;
