import type { TSubjectSchemaType } from "./SubjectSchemaType";

export type TLectureSchemaType = {
  _id?: string;
  lectureName: string;
  lectureDesc: string;
  subject: TSubjectSchemaType | null;
  attachmentUrl: string;
  createdAt: Date;
  updatedAt: Date;
};
