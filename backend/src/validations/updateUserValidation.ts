import * as yup from "yup";

const updateUserValidation = yup.object().shape({
  _id: yup.string().required("User id is Required!"),
});

export default updateUserValidation;
