import express from "express";
import { getAllSubjects, postSubject } from "../controllers/subjectController";

const route = express.Router();

route.get("", getAllSubjects);

route.put("/", async () => {});

export default route;
