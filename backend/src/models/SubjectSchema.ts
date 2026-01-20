import mongoose, { Schema, Types } from "mongoose";
import { TSubjectSchemaType } from "../types/SubjectSchemaTypes";

const Subject = new Schema<TSubjectSchemaType>(
  {
    subjectName: { type: String, required: true, unique: true },
    subjectCode: { type: String, required: true, unique: true },
    doctorName: { type: String, required: true, unique: true },
    subjectDesc: { type: String, required: true },
    subjectHours: { type: Number, required: true },
    lectures: { type: [String], default: [] },
    sections: { type: [String], default: [] },
    assignments: [{ type: Types.ObjectId, ref: "Assignment", default: [] }],
    book: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Subject || mongoose.model("Subject", Subject);
