import * as yup from "yup";

const signupValidationSchema = yup.object().shape({
  userName: yup.string().required("Student Name is Required!"),
  userCode: yup.number().required("Student Code is Required!"),
  group: yup
    .string()
    .oneOf(["a", "b", "c", "d"])
    .length(1, "Just Enter One Letter!")
    .required("Student Group is Required!"),
  section: yup
    .number()
    .min(1, "Min Section Number is 1")
    .max(9, "Max Section Number is 6")
    .required("Student Section is Required!"),
  password: yup.string().required("Password is Required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password Must Be Same The Password")
    .required("Conform Password is Required!"),
});

export default signupValidationSchema;
