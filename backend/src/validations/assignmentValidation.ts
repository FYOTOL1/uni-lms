import * as yup from "yup";

const assignmentValidation = yup.object().shape({
  assignmentTitle: yup.string().required("Title is Required"),
  assignmentDesc: yup.string().required("Description is Required"),
  subject: yup.string().required("Subject id is Required"),
  deadline: yup.date().required("Dead Line is Required"),
  sectionNumber: yup
    .number()
    .oneOf([1, 2, 3, 4, 5, 6])
    .required("Section Number is Required"),
  group: yup
    .string()
    .oneOf(["a", "b", "c", "d"])
    .required("Dead Like is Required"),
  file: yup
    .mixed()
    .required("File is Required!")
    .test(
      "FILE_SIZE",
      "File is too Large! (Max 50MB)",
      (value: any) => !value || (value && value.size <= 1024 * 1024 * 50),
    )
    .test(
      "FILE_TYPE",
      "File Not One of IMAGE or PDF",
      (value: any) =>
        !value ||
        (value &&
          ["image/jpeg", "image/png", "image/jpg", "application/pdf"].includes(
            value.mimetype,
          )),
    ),
});

export default assignmentValidation;
