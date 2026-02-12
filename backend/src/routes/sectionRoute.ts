import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  deleteSection,
  getAllSections,
  postSection,
  updateSection,
} from "../controllers/sectionController";
import hasPermissionsMiddleware from "../middlewares/hasPermissionsMiddleware";
import upload from "../middlewares/multerMiddleware";
import sectionValidationMiddleware from "../middlewares/validations/sectionValidationMiddleware";

const route = express.Router();

route.get("/", authMiddleware, getAllSections);

route.post(
  "/",
  authMiddleware,
  hasPermissionsMiddleware("sections", "canCreate"),
  upload.single("file"),
  sectionValidationMiddleware,
  postSection,
);

route.patch(
  "/:id",
  authMiddleware,
  hasPermissionsMiddleware("sections", "canEdit"),
  upload.single("file"),
  updateSection,
);

route.delete(
  "/:id",
  authMiddleware,
  hasPermissionsMiddleware("sections", "canDelete"),
  deleteSection,
);

export default route;
