import mongoose, { Schema } from "mongoose";
import { IStudentSchema } from "../types/StudentSchemaTypes";

const Student = new Schema<IStudentSchema>(
  {
    studentName: { type: String, required: true },
    studentCode: { type: Number, required: true, unique: true },
    studentGroup: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["a", "b", "c", "d"],
    },
    studentSection: { type: Number, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    role: {
      type: String,
      enum: ["student", "subadmin", "admin"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudentSchema>("Student", Student) ||
  mongoose.models.Student;
