import { Types } from "mongoose";

type TLectureCalendarType = {
  subjectId: Types.ObjectId;
  doctorName: string;
  hallCode: string;
  startTime: string;
  endTime: string;
};

type TSectionCalendarType = {
  subjectId: Types.ObjectId;
  assistantName: string;
  sectionCode: string;
  startTime: string;
  endTime: string;
};

type TWeekDays =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export type TCalendarSchemaType = {
  dayName: TWeekDays;
  year: "first" | "second" | "third" | "fourth";
  semester: 1 | 2;
  group: string;
  lectures: TLectureCalendarType[];
  sections: TSectionCalendarType[];
  createdAt: Date;
  updatedAt: Date;
};
