import express from "express";
import { subjectValidationMiddleware } from "../middlewares/validations/subjectValidationMiddleware";
import {
  deleteSubject,
  getAllSubjects,
  getOneSubject,
  postSubject,
  updateSubject,
} from "../controllers/subjectController";
import upload from "../middlewares/multerMiddleware";
import authMiddleware from "../middlewares/authMiddleware";
import hasRole from "../middlewares/hasRole";
import hasPermissionsMiddleware from "../middlewares/hasPermissionsMiddleware";

const route = express.Router();

route.get("/", authMiddleware, getAllSubjects);

route.post("/:subjectCode", getOneSubject);

route.post(
  "/",
  authMiddleware,
  hasRole(["subadmin", "admin"]),
  hasPermissionsMiddleware("subjects", "canCreate"),
  upload.single("book"),
  subjectValidationMiddleware,
  postSubject,
);

route.patch(
  "/:id",
  authMiddleware,
  hasRole(["subadmin", "admin"]),
  hasPermissionsMiddleware("subjects", "canEdit"),
  upload.single("book"),
  updateSubject,
);

route.delete(
  "/:id",
  authMiddleware,
  hasRole(["subadmin", "admin"]),
  hasPermissionsMiddleware("subjects", "canDelete"),
  deleteSubject,
);

export default route;
