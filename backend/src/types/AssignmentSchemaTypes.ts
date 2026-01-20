import { Types } from "mongoose";

export type AssignmentSchemaType = {
  _id: string;
  subjectId: Types.ObjectId;
  assignmentTitle: string;
  assignmentDesc: string;
  attachmentUrl?: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
};
