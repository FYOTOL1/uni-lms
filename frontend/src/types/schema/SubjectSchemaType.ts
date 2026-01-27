import type { TAssignmentSchemaType } from "./AssignmentSchemaType";

export type TSubjectSchemaType = {
  _id: string;
  subjectName: string;
  subjectCode: string;
  subjectDesc: string;
  subjectHours: number;
  doctorsNames: string[];
  assignments?: TAssignmentSchemaType[];
  lectures?: string[];
  sections?: string[];
  book?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
