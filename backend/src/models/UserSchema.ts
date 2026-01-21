import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../types/UserSchemaTypes";

const User = new Schema<IUserSchema>(
  {
    userName: { type: String, required: true },
    userCode: { type: Number, required: true, unique: true },
    userGroup: {
      type: String,
      required: true,
      lowercase: true,
      enum: ["a", "b", "c", "d"],
    },
    userSection: { type: Number, required: true },
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
  },
);

export default mongoose.model<IUserSchema>("User", User) ||
  mongoose.models.User;
