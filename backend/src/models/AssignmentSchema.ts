import mongoose, { Schema } from "mongoose";
import { TAssignmentSchemaType } from "../types/AssignmentSchemaTypes";

const Assignment = new Schema<TAssignmentSchemaType>(
  {
    assignmentTitle: { type: String, required: true },
    assignmentDesc: { type: String, required: true },
    attachmentUrl: { type: String, required: true },
    deadline: { type: Date, required: true },
    subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", Assignment);
