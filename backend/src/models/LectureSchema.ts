import mongoose, { Schema } from "mongoose";
import { TLectureSchemaType } from "../types/LectureSchemaTypes";

const Lecture = new Schema<TLectureSchemaType>(
  {
    lectureName: { type: String, required: true },
    lectureDesc: { type: String, required: true },
    attachmentUrl: { type: String, required: true },
    attachmentType: { type: String, required: true },
    subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Lecture || mongoose.model("Lecture", Lecture);
