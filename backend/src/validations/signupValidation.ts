import * as yup from "yup";

const signupValidation = yup.object().shape({
  userName: yup.string().required("Student Name is Required!"),
  userCode: yup.number().required("Student Code is Required!"),
  userGroup: yup
    .string()
    .oneOf(["a", "b", "c", "d"])
    .length(1, "Just Enter One Letter!")
    .required("Student Group is Required!"),
  userSection: yup
    .number()
    .min(1, "Min Section Number is 1")
    .max(9, "Max Section Number is 6")
    .required("Student Section is Required!"),
  password: yup.string().required("Password is Required!"),
});

export default signupValidation;
