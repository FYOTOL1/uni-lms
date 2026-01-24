import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  getAllCalendars,
  postCalendar,
} from "../controllers/calendarController";
import calendarValidationMiddleware from "../middlewares/validations/calendarValidationMiddleware";

const route = express.Router();

route.get("/", authMiddleware, getAllCalendars);
route.post("/", calendarValidationMiddleware, postCalendar);

export default route;
