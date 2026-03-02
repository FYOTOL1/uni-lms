import mongoose, { Schema, Types } from "mongoose";
import { TSubjectSchemaType } from "../types/SubjectSchemaTypes";

const Subject = new Schema<TSubjectSchemaType>(
  {
    subjectName: { type: String, required: true, unique: true },
    subjectCode: {
      type: String,
      trim: true,
      uppercase: true,
      required: true,
      unique: true,
    },
    subjectDesc: { type: String, required: true },
    subjectHours: { type: Number, required: true },
    doctorsNames: { type: [String], required: true },
    year: {
      type: String,
      enum: ["first", "second", "third", "fourth"],
      required: true,
    },
    semester: {
      type: Number,
      enum: [1, 2],
      required: true,
    },
    lectures: { type: [String], default: [] },
    sections: { type: [String], default: [] },
    assignments: [{ type: Types.ObjectId, ref: "Assignment", default: [] }],
    book: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

Subject.pre("deleteOne", { document: true, query: false }, async function () {
  await mongoose.model("Lecture").deleteMany({
    subject: this._id,
  });
  await mongoose.model("Section").deleteMany({
    subject: this._id,
  });
});

export default mongoose.models.Subject || mongoose.model("Subject", Subject);
