import mongoose, { Schema } from "mongoose";
import { TSectionSchemaType } from "../types/SectionSchemaTypes";

const Section = new Schema<TSectionSchemaType>(
  {
    sectionName: { type: String, required: true },
    sectionDesc: { type: String, required: true },
    attachmentUrl: { type: String, required: true },
    subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Section || mongoose.model("Section", Section);
