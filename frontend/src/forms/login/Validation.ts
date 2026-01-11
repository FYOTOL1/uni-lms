import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
  studentCode: yup.number().required("Student Code is Required!"),
  password: yup.string().required("Password is Required!"),
});

export default loginValidationSchema;
