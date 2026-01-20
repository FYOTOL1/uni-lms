import * as yup from "yup";

const subjectValidation = yup.object().shape({
  subjectName: yup.string(),
  subjectCode: yup.string(),
  subjectDesc: yup.string(),
  subjectHours: yup.number(),
  doctorName: yup.string(),
});

export default subjectValidation;
