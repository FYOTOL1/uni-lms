import * as yup from "yup";

const signupValidation = yup.object().shape({
  userName: yup.string().required("Student name is required!"),
  userCode: yup.number().required("Student code is required!"),
  userGroup: yup
    .string()
    .oneOf(["a", "b", "c", "d"])
    .lowercase()
    .required("Student group is required!"),
  userSection: yup.number().required("Student section is required!"),
  email: yup.string().email("Invalid email").required("Email is required!"),
  password: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .required("Phone number is required!"),
  gender: yup.string().oneOf(["male", "female"]),
});

export default signupValidation;
