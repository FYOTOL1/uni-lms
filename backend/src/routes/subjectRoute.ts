import express from "express";
import subjectValidationMiddleware from "../middlewares/validations/subjectValidationMiddleware";
import { getAllSubjects, postSubject } from "../controllers/subjectController";
import upload from "../middlewares/multerMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const route = express.Router();

route.get("", getAllSubjects);

route.post(
  "/",
  authMiddleware,
  subjectValidationMiddleware,
  upload.single("file"),
  postSubject,
);

export default route;
