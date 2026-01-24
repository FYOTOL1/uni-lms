import { Request, Response } from "express";
import CalendarSchema from "../models/CalendarSchema";

const getAllCalendars = async (req: Request, res: Response) => {
  try {
    const getCalendars = await CalendarSchema.find()
      .populate("lectures.subjectId")
      .populate("sections.subjectId");
    return res.status(200).json({ calendars: getCalendars });
  } catch (error: any) {
    console.log("CalendarControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

const postCalendar = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const createCalendar = await CalendarSchema.create(body);

    return res.status(201).json({
      message: "calendar created successfully!",
      calendar: createCalendar,
    });
  } catch (error: any) {
    console.log("CalendarControllerFile: " + error.message);
    res.status(500).json({ message: "internal server error!" });
  }
};

export { getAllCalendars, postCalendar };
