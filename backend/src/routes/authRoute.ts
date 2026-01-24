import express from "express";
import {
  getUserData,
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/authController";
import signupValidationMiddleware from "../middlewares/validations/signupValidationMiddleware";
import loginValidationMiddleware from "../middlewares/validations/loginValidationMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signupValidationMiddleware, signupUser);
router.post("/login", loginValidationMiddleware, loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getUserData);

export default router;
