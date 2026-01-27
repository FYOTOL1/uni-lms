import express, { Request, Response } from "express";
import { getAllSubjects, postSubject } from "../controllers/subjectController";
import SubjectSchema from "../models/SubjectSchema";

const route = express.Router();

route.get("/", getAllSubjects);

route.put("/", async (req: Request, res: Response) => {
  try {
    const result = await SubjectSchema.updateMany(
      {},
      { doctorsNames: ["mostafa adel", "khaled saqr"] },
    );

    return res.status(200).json({
      modified: result.modifiedCount,
      matchedFounded: result.matchedCount,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Server Internal Error!", error: error.message });
  }
});

export default route;
