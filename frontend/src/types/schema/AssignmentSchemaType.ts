import type { TSubjectSchemaType } from "./SubjectSchemaType";

type TAssignmentSchemaType = {
  _id: string;
  subject: TSubjectSchemaType;
  assignmentTitle: string;
  assignmentDesc: string;
  attachmentUrl?: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type { TAssignmentSchemaType };
