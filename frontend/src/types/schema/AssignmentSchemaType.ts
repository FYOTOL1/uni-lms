import type { TSubjectSchemaType } from "./SubjectSchemaType";

type TAssignmentSchemaType = {
  _id: string;
  assignmentTitle: string;
  assignmentDesc: string;
  attachmentUrl: string;
  subject: TSubjectSchemaType;
  deadline: Date;
  sectionNumber: 1 | 2 | 3 | 4 | 5 | 6;
  group: "a" | "b" | "c" | "d";
  createdAt: Date;
  updatedAt: Date;
};

export type { TAssignmentSchemaType };
