import * as yup from "yup";

const signupValidationSchema = yup.object().shape({
  studentName: yup.string().required("Student Name is Required!"),
  studentCode: yup.number().required("Student Code is Required!"),
  studentGroup: yup
    .string()
    .oneOf(["a", "b", "c", "d"])
    .required("Student Group is Required!"),
  studentSection: yup
    .number()
    .min(1, "Min Section Number is 1")
    .max(9, "Max Section Number is 9")
    .required("Student Section is Required!"),
  email: yup.string().email().required("Email is Required!"),
  password: yup.string().required("Password is Required!"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm Password Must Be Same The Password")
    .required("Conform Password is Required!"),
  phoneNumber: yup.number().required("Phone Number is Required!"),
});

export default signupValidationSchema;
