import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import de from "dotenv";

de.config();

type TStudentRequest = { _id: string; role: "admin" | "subadmin" | "student" };

declare global {
  namespace Express {
    interface Request {
      student?: TStudentRequest;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.cookies?.token;

  if (!authToken) {
    return res.status(401).json({ message: "no token passed!" });
  } else {
    try {
      const decode = jwt.verify(authToken, process.env.JWT_SECRET!);
      req.student = decode as jwt.JwtPayload & TStudentRequest;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token!" });
    }
  }
};

export default authMiddleware;
