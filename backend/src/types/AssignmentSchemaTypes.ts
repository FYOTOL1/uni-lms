import { Types } from "mongoose";
import { TSubjectSchemaType } from "./SubjectSchemaTypes";

export type TAssignmentSchemaType = {
  _id: string;
  subject: TSubjectSchemaType & Types.ObjectId;
  assignmentTitle: string;
  assignmentDesc: string;
  attachmentUrl: string;
  deadline: Date;
  sectionNumber: number;
  group: "a" | "b" | "c" | "d";
  createdAt: Date;
  updatedAt: Date;
};
