import { Types } from "mongoose";
import { TAssignmentSchemaType } from "./AssignmentSchemaTypes";

export type TSubjectSchemaType = {
  _id: string;
  subjectName: string;
  subjectCode: string;
  subjectDesc: string;
  subjectHours: number;
  assignments: AssignmentSchemaType[] & Types.ObjectId;
  doctorsNames: string[];
  lectures: string[];
  sections: string[];
  book: string;
  createdAt: Date;
  updatedAt: Date;
};
