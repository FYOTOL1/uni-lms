/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const CreateLectureValidation = yup.object().shape({
  lectureName: yup.string(),
  lectureDesc: yup.string(),
  subject: yup.string(),
  file: yup
    .mixed()
    .required("File is Required!")
    .test(
      "FILE_SIZE",
      "File is too Large! (Max 50MB)",
      (value: any) => !value || (value && value.size <= 1024 * 1024 * 50),
    ),
});

export default CreateLectureValidation;
