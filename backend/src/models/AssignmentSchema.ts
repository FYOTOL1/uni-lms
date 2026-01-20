import mongoose, { Schema } from "mongoose";
import { AssignmentSchemaType } from "../types/AssignmentSchemaTypes";

const Assignment = new Schema<AssignmentSchemaType>(
  {
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    assignmentTitle: { type: String, required: true },
    assignmentDesc: { type: String, required: true },
    attachmentUrl: { type: String, required: true },
    deadline: { type: Date, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", Assignment);
