import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { getAllLectures, postLecture } from "../controllers/lectureController";
import lectureValidationMiddleware from "../middlewares/validations/lectureValidationMiddleware";
import hasPermissionsMiddleware from "../middlewares/hasPermissionsMiddleware";
import upload from "../middlewares/multerMiddleware";

const route = express.Router();

route.get("/", authMiddleware, getAllLectures);
route.post(
  "/",
  authMiddleware,
  hasPermissionsMiddleware("lectures", "canCreate"),
  upload.single("file"),
  lectureValidationMiddleware,
  postLecture,
);

export default route;
