import type { TAssignmentSchemaType } from "./AssignmentSchemaType";
import type { TLectureSchemaType } from "./LectureSchemaType";
import type { TSectionSchemaType } from "./SectionSchemaType";

export type TSubjectSchemaType = {
  _id?: string;
  subjectName: string;
  subjectCode: string;
  subjectDesc: string;
  subjectHours: number;
  doctorsNames: string[];
  assignments?: TAssignmentSchemaType[];
  lectures?: TLectureSchemaType[];
  sections?: TSectionSchemaType[];
  book?: string | File;
  year: "first" | "second" | "third" | "fourth" | "";
  semester: "1" | "2" | null;
  createdAt?: Date;
  updatedAt?: Date;
};
