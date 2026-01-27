import { Types } from "mongoose";
import { TSubjectSchemaType } from "./SubjectSchemaTypes";

export type TSectionSchemaType = {
  _id: string;
  sectionName: string;
  sectionDesc: string;
  subject: TSubjectSchemaType & Types.ObjectId;
  attachmentUrl: string;
  attachmentType: "file" | "image";
  createdAt: Date;
  updatedAt: Date;
};
