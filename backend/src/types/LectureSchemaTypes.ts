import { Types } from "mongoose";
import { TSubjectSchemaType } from "./SubjectSchemaTypes";

export type TLectureSchemaType = {
  _id?: string;
  lectureName: string;
  lectureDesc: string;
  subject: TSubjectSchemaType & Types.ObjectId;
  attachmentUrl: string;
  attachmentType: "pdf" | "png" | "jpg" | string;
  createdAt: Date;
  updatedAt: Date;
};
