import type { AssignmentSchemaType } from "./AssignmentSchemaType";

export type TSubjectSchemaType = {
  _id: string;
  subjectName: string;
  subjectCode: string;
  subjectDesc: string;
  subjectHours: number;
  doctorName: string;
  assignments?: AssignmentSchemaType[];
  lectures?: string[];
  sections?: string[];
  book?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
