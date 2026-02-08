import express from "express";
import {
  deleteUser,
  getAllStudents,
  updateUser,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import hasRole from "../middlewares/hasRole";
import updateUserValidationMiddleware from "../middlewares/validations/updateUserValidationMiddleware";
import hasPermissionsMiddleware from "../middlewares/hasPermissionsMiddleware";

const router = express.Router();

router.get("/", authMiddleware, hasRole(["subadmin", "admin"]), getAllStudents);

router.patch(
  "/",
  authMiddleware,
  updateUserValidationMiddleware,
  hasRole(["admin"]),
  hasPermissionsMiddleware("users", "canEdit"),
  updateUser,
);

router.delete("/:id", authMiddleware, hasRole(["admin"]), deleteUser);

export default router;
