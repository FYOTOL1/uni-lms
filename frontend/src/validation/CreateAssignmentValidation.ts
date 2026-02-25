/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";

const CreateAssignmentValidation = yup.object().shape({
  assignmentTitle: yup.string().required("Title is Required"),
  assignmentDesc: yup.string().required("Description is Required"),
  subject: yup.string().required("Subject is Required"),
  deadline: yup.string(),
  section: yup.number(),
  group: yup.string(),
  file: yup
    .mixed()
    .required("File is Required!")
    .test(
      "FILE_SIZE",
      "File is too Large! (Max 50MB)",
      (value: any) => !value || (value && value.size <= 1024 * 1024 * 50),
    ),
});

export default CreateAssignmentValidation;
