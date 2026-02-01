import express from "express";
import { getAllStudents } from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import hasRole from "../middlewares/hasRole";

const router = express.Router();

router.get("/", authMiddleware, hasRole(["subadmin", "admin"]), getAllStudents);

export default router;
