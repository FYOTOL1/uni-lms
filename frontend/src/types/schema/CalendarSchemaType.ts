import type { TSubjectSchemaType } from "./SubjectSchemaType";

export type TLectureCalendar = {
  subjectId: TSubjectSchemaType;
  doctorName: string;
  hallCode: string;
  startTime: string;
  endTime: string;
};

export type TSectionCalendar = {
  subjectId: TSubjectSchemaType;
  assistantName: string;
  sectionCode: string;
  startTime: string;
  endTime: string;
};

type TWeekDays =
  | "Saturday"
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export type TCalendarSchemaType = {
  _id: string;
  dayName: TWeekDays;
  year: "first" | "second" | "third" | "fourth";
  semester: 1 | 2;
  group: string;
  lectures: TLectureCalendar[];
  sections: TSectionCalendar[];
  createdAt: Date;
  updatedAt: Date;
};
