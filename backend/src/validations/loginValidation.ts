import * as yup from "yup";

const loginValidation = yup.object().shape({
  userCode: yup.number().required("Student Code is Required!"),
  password: yup.string().required("Password is Required!"),
});

export default loginValidation;
