import type { TAssignmentSchemaType } from "./AssignmentSchemaType";

export type TSubjectSchemaType = {
  _id?: string;
  subjectName: string;
  subjectCode: string;
  subjectDesc: string;
  subjectHours: number;
  doctorsNames: string[];
  assignments?: TAssignmentSchemaType[];
  lectures?: string[];
  sections?: string[];
  book?: string | File;
  year: "first" | "second" | "third" | "fourth" | "";
  semester: "1" | "2" | null;
  createdAt?: Date;
  updatedAt?: Date;
};
