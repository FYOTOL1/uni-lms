import type { TSubjectSchemaType } from "./SubjectSchemaType";

export type TSectionSchemaType = {
  _id: string;
  sectionName: string;
  sectionDesc: string;
  attachmentUrl: string;
  subject: TSubjectSchemaType;
  createdAt: Date;
  updatedAt: Date;
};
