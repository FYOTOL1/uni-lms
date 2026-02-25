import mongoose, { Schema } from "mongoose";
import { IUserSchema } from "../types/UserSchemaTypes";

const permissionsActionsSchema = {
  canCreate: { type: Boolean, default: false },
  canEdit: { type: Boolean, default: false },
  canDelete: { type: Boolean, default: false },
};

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
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    year: {
      type: String,
      enum: ["first", "second", "third", "fourth"],
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "subadmin", "admin"],
      default: "student",
    },
    permissions: {
      users: permissionsActionsSchema,
      subjects: permissionsActionsSchema,
      calendars: permissionsActionsSchema,
      assignments: permissionsActionsSchema,
      lectures: permissionsActionsSchema,
      sections: permissionsActionsSchema,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUserSchema>("User", User) ||
  mongoose.models.User;
