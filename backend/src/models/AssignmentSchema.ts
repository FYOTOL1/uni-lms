import mongoose, { Schema } from "mongoose";
import { TAssignmentSchemaType } from "../types/AssignmentSchemaTypes";

const Assignment = new Schema<TAssignmentSchemaType>(
  {
    assignmentTitle: { type: String, required: true },
    assignmentDesc: { type: String, required: true },
    attachmentUrl: { type: String, required: true },
    deadline: { type: Date, required: true },
    sectionNumber: { type: Number, enum: [1, 2, 3, 4, 5, 6], required: true },
    group: { type: String, enum: ["a", "b", "c", "d"], required: true },
    subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Assignment ||
  mongoose.model("Assignment", Assignment);
