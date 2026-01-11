import express, { Request } from "express";
import {
  getStudentData,
  loginStudent,
  logoutStudent,
  signupStudent,
} from "../controllers/authController";
import signupValidationMiddleware from "../middlewares/signupValidationMiddleware";
import loginValidationMiddleware from "../middlewares/loginValidationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signupValidationMiddleware, signupStudent);
router.post("/login", loginValidationMiddleware, loginStudent);
router.post("/logout", logoutStudent);
router.get("/me", authMiddleware, getStudentData);

export default router;
