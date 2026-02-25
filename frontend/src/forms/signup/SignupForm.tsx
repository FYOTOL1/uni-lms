import { useFormik } from "formik";
import { useState } from "react";
import InputField from "../../components/pages/user/auth/InputField";
import signupValidationSchema from "./Validation";
import { Link, useNavigate } from "react-router";
import Select from "../../components/pages/user/shared/FormSelect";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { signupAuth } from "../../store/slices/AuthSlice";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, status, error } = useAppSelector((state) => state.auth);

  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const initialFormValues = {
    userName: "",
    userCode: null,
    group: "",
    section: null,
    password: "",
    confirmPassword: "",
    year: null,
  };

  const { handleBlur, handleSubmit, setFieldValue, touched, values, errors } =
    useFormik({
      initialValues: initialFormValues,
      validationSchema: signupValidationSchema,
      onSubmit: async () => {
        if (status != "pending")
          dispatch(
            signupAuth({
              userName: values.userName,
              userCode: values.userCode,
              userGroup: values.group,
              userSection: values.section,
              password: values.password,
              year: values.year,
            }),
          ).then(() => user && !error.signup && navigate("/"));
      },
    });

  const focusAndUnfocusStyle = (name: string) => {
    if (
      errors[name as keyof typeof errors] &&
      touched[name as keyof typeof touched]
    ) {
      return "outline outline-red-400";
    }
    if (focusedFieldName === name) {
      return "outline outline-purple-600";
    }
    if (touched[name as keyof typeof touched]) {
      return "outline outline-purple-400";
    }
    return "";
  };

  console.log(values);

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="max-w-lg w-full rounded-lg bg-white shadow-2xl shadow-gray-300 outline outline-gray-200 p-6 mx-2 font-light">
        {/* Form Header */}
        <div className="flex flex-col items-center justify-center gap-2 text-center mb-10">
          <div className="flex items-center justify-center size-14 text-3xl text-white bg-purple-500 p-3 rounded-full">
            <i className="fa-solid fa-building-columns"></i>
          </div>
          <h2 className="text-[#333] text-xs">
            There is no connection between this system and the <br />
            administration of SGU University.
          </h2>
        </div>

        {/* Form inputs */}
        <form onSubmit={handleSubmit} className="grid gap-4 items-center ">
          {/* Student Name */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="like: Ahmed Abdo..."
            fieldName="student name"
            inputName="userName"
            values={values}
          />

          {/* Password */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="like: ahmed_2026"
            fieldName="password"
            inputName="password"
            inputType="password"
            values={values}
            iconClass="fa-solid fa-lock"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Confirm Password */}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: ahmed_2026"
              fieldName="confirm password"
              inputName="confirmPassword"
              inputType="password"
              values={values}
              iconClass="fa-solid fa-unlock"
            />

            {/* Student Code*/}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: 251234"
              fieldName="student code"
              inputName="userCode"
              inputType="number"
              values={values}
              iconClass="fa-solid fa-hashtag"
            />
          </div>

          {/* Student Group & Section & Submit Button */}
          <div className="grid grid-cols-1 items-end md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-2">
            <Select
              choiceList={["a", "b", "c", "d"]}
              setFieldValue={setFieldValue}
              values={values}
              defaultValue={"group"}
            />
            <Select
              choiceList={[1, 2, 3, 4, 5, 6]}
              setFieldValue={setFieldValue}
              values={values}
              defaultValue={"section"}
            />
            {/* Year */}
            <Select
              choiceList={["first", "second", "third", "fourth"]}
              setFieldValue={setFieldValue}
              values={values}
              defaultValue={"year"}
            />
          </div>

          {/* Submit Button */}
          <button className="py-2 text-[16px] bg-purple-600 h-fit mt-auto rounded text-white cursor-pointer transition-all hover:bg-purple-700 focus:bg-purple-700">
            {status == "pending" ? "Loading..." : "Signup"}
          </button>
          <hr className="text-gray-300" />
          <div className="flex justify-center w-full gap-2 text-sm">
            <p>Already Have an Account?</p>
            <button className="text-purple-600 underline">
              <Link to={"/auth/login"}>Login</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
