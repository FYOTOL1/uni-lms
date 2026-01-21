import { Request, Response } from "express";
import SubjectSchema from "../models/SubjectSchema";

const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const findSubjects = await SubjectSchema.find();

    res.status(200).json({ message: "successfully!", subjects: findSubjects });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "internal server error!", error: error.message });
  }
};

const postSubject = async (req: Request, res: Response) => {
  try {
    if (req.user?.role == "admin" || req.user?.role == "subadmin" || true) {
      const requestBody = req.body;

      const createSubject = await SubjectSchema.create(requestBody);

      return res.status(201).json({
        message: "subject created successfully!",
        subject: createSubject,
      });
    } else {
      res
        .status(401)
        .json({ message: "you need permissions to do this action!" });
    }
  } catch (error: any) {
    if (error?.code === 11000) {
      const field = Object.keys(error.keyValue)[0];

      return res
        .status(409)
        .json({ message: `${field} already exists!`, field });
    }

    console.log(error?.message);
    res.status(500).json({ message: "internal server error" });
  }
};

export { postSubject, getAllSubjects };
