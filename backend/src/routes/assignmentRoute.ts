import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  deleteAssignment,
  getAllAssignments,
  postAssignment,
  updateAssignment,
} from "../controllers/assignmentController";
import hasPermissionsMiddleware from "../middlewares/hasPermissionsMiddleware";
import upload from "../middlewares/multerMiddleware";
import assignmentValidationMiddleware from "../middlewares/validations/assignmentValidationMiddleware";

const route = express.Router();

route.get("/", authMiddleware, getAllAssignments);

route.post(
  "/",
  authMiddleware,
  hasPermissionsMiddleware("assignments", "canCreate"),
  upload.single("file"),
  assignmentValidationMiddleware,
  postAssignment,
);

route.patch(
  "/:id",
  authMiddleware,
  hasPermissionsMiddleware("assignments", "canEdit"),
  upload.single("file"),
  updateAssignment,
);

route.delete(
  "/:id",
  authMiddleware,
  hasPermissionsMiddleware("assignments", "canDelete"),
  deleteAssignment,
);

export default route;
