import * as yup from "yup";

const subjectValidation = yup.object().shape({
  subjectName: yup.string(),
  subjectCode: yup.string(),
  subjectDesc: yup.string(),
  subjectHours: yup.string(),
  doctorsNames: yup.array().of(yup.string()),
  year: yup.string().oneOf(["first", "second", "third", "fourth"]),
  semester: yup.string().oneOf(["1", "2"]),
  book: yup
    .mixed()
    .required("Book is Required!")
    .test(
      "FILE_SIZE",
      "File is too Large! (Max 50MB)",
      (value: any) => !value || (value && value.size <= 1024 * 1024 * 50),
    ),
});

export { subjectValidation };
