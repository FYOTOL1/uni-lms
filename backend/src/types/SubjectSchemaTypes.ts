import { Types } from "mongoose";
import { TAssignmentSchemaType } from "./AssignmentSchemaTypes";

export type TSubjectSchemaType = {
  _id: string;
  subjectName: string;
  subjectCode: string;
  subjectDesc: string;
  subjectHours: number;
  assignments: TAssignmentSchemaType[] & Types.ObjectId;
  doctorsNames: string[];
  lectures: string[];
  sections: string[];
  book: string;
  year: "first" | "second" | "third" | "fourth";
  semester: 1 | 2;
  createdAt: Date;
  updatedAt: Date;
};
