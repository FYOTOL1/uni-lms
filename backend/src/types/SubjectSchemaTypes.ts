import { Types } from "mongoose";
import { AssignmentSchemaType } from "./AssignmentSchemaTypes";

export type TSubjectSchemaType = {
  _id: string;
  subjectName: string;
  subjectCode: string;
  subjectDesc: string;
  subjectHours: number;
  doctorName: string;
  assignments: AssignmentSchemaType[] & Types.ObjectId;
  lectures: string[];
  sections: string[];
  book: string;
  createdAt: Date;
  updatedAt: Date;
};
