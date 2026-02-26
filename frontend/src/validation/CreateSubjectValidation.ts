/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const CreateSubjectValidation = yup.object().shape({
  subjectName: yup.string().required("Subject Name is Required!"),
  subjectCode: yup.string().required("Subject Code is Required!"),
  subjectDesc: yup.string().required("Subject Description is Required!"),
  subjectHours: yup.number().required("Subject Hours is Required!"),
  doctorsNames: yup
    .array()
    .of(yup.string())
    .required("Doctors Names is Required!"),
  year: yup
    .string()
    .oneOf(["first", "second", "third", "fourth"])
    .required("Year is Required!"),
  semester: yup.string().oneOf(["1", "2"]).required("Semester is Required!"),
  book: yup
    .mixed()
    .required("Book is Required!")
    .test(
      "FILE_SIZE",
      "File is too Large! (Max 50MB)",
      (value: any) => !value || (value && value.size <= 1024 * 1024 * 50),
    ),
});

export default CreateSubjectValidation;
