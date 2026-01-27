import mongoose, { Schema } from "mongoose";
import { TSectionSchemaType } from "../types/SectionSchemaTypes";

const Section = new Schema<TSectionSchemaType>(
  {
    subject: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    sectionName: { type: String, required: true },
    sectionDesc: { type: String, required: true },
    attachmentUrl: { type: String, required: true },
    attachmentType: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.models.Section || mongoose.model("Section", Section);
