type AssignmentSchemaType = {
  _id: string;
  subjectId: string;
  subjectName: string;
  assignmentTitle: string;
  assignmentDesc: string;
  imgUrl: string;
  deadline: Date;
  isDone: boolean;
};

export type { AssignmentSchemaType };
