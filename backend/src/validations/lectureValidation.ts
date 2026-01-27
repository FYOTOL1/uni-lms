import * as yup from "yup";

const lectureValidation = yup.object().shape({
  lectureName: yup.string().required("Lecture Name is Required!"),
  lectureDesc: yup.string().required("Lecture Description is Required!"),
  subject: yup.string().required("SubjectId is Required!"),
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

export default lectureValidation;
