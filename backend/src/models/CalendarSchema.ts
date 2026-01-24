import mongoose, { Schema } from "mongoose";
import { TCalendarSchemaType } from "../types/CalendarSchemaTypes";

const Calendar = new Schema<TCalendarSchemaType>(
  {
    dayName: {
      type: String,
      required: true,
      enum: [
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
      ],
      index: true,
    },

    year: {
      type: String,
      enum: ["first", "second", "third", "fourth"],
      required: true,
    },

    semester: { type: Number, enum: [1, 2], required: true },

    group: { type: String, enum: ["a", "b", "c", "d"], required: true },

    lectures: [
      {
        subjectId: {
          type: Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        doctorName: { type: String, required: true },
        hallCode: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],

    sections: [
      {
        subjectId: {
          type: Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },
        assistantName: {
          type: String,
          required: true,
        },
        sectionCode: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

Calendar.index({ dayName: 1, year: 1, semester: 1 }, { unique: true });

export default mongoose.models.Calendar || mongoose.model("Calendar", Calendar);
