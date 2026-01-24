import { Types } from "mongoose";

type TLectureCalendar = {
  subjectId: Types.ObjectId;
  doctorName: string;
  hallCode: string;
  startTime: string;
  endTime: string;
};

type TSectionCalendar = {
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
  lectures: TLectureCalendar[];
  sections: TSectionCalendar[];
  createdAt: Date;
  updatedAt: Date;
};
