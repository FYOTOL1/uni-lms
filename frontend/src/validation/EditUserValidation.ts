import * as yup from "yup";

const editUserValidation = yup.object().shape({
  userName: yup.string().required("Student Name is Required!"),
  userCode: yup.number().required("Student Code is Required!"),
  userGroup: yup
    .string()
    .oneOf(["a", "b", "c", "d"])
    .required("Student Group is Required!"),
  userSection: yup
    .number()
    .min(1, "Min Section Number is 1")
    .max(9, "Max Section Number is 9")
    .required("Student Section is Required!"),
  email: yup.string().email(),
  phoneNumber: yup.number(),
  gender: yup.string().oneOf(["male", "female"]),
  role: yup.string().oneOf(['student', "subadmin", "admin"])
});

export default editUserValidation;
