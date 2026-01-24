import * as yup from "yup";

const lectureValidation = yup.object({
  subjectId: yup.string().required("SubjectId is Required"),
  doctorName: yup.string().required("Doctor Name is Required!"),
  hallCode: yup.string().required("Hall Code is Required!"),
  startTime: yup.string().required("Start Time is Required!"),
  endTime: yup.string().required("End Time is Required!"),
});

const sectionValidation = yup.object({
  subjectId: yup.string().required("SubjectId is Required"),
  assistantName: yup.string().required("Assistant Name is Required!"),
  sectionCode: yup.string().required("Section Code is Required!"),
  startTime: yup.string().required("Start Time is Required!"),
  endTime: yup.string().required("End Time is Required!"),
});

const calendarValidation = yup.object().shape({
  dayName: yup
    .string()
    .oneOf(
      [
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
      ],
      "Incorrect Day!",
    )
    .required("Day Name is Required!"),

  year: yup
    .string()
    .oneOf(["first", "second", "third", "fourth"], "Year is InCorrect!")
    .required("Year is Required!"),

  semester: yup
    .number()
    .oneOf([1, 2], "Semester is InCorrect!")
    .required("Semester is Required!"),

  group: yup
    .string()
    .oneOf(["a", "b", "c", "d"], "Incorrect Group Passed!")
    .required("Group is Required"),

  lectures: yup.array().of(lectureValidation).required("Lectures is Required!"),
  sections: yup.array().of(sectionValidation).required("Sections is Required!"),
});

export default calendarValidation;
