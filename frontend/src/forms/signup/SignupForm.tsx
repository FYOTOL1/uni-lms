import { useFormik } from "formik";
import { useState } from "react";
import InputField from "../../components/pages/auth/InputField";
import signupValidationSchema from "./Validation";
import { useMutation } from "@tanstack/react-query";
import { signupFn } from "../../api/authApi";
import { Link, useNavigate } from "react-router";
import type { TInitialInputsAuthFormValues } from "../../types/form/formTypes";
import toast from "react-hot-toast";
import Select from "../../components/pages/shared/FormSelect";

const SignupForm = () => {
  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signupFn,
    onSuccess: () => {
      navigate("/");
      toast.success("signed up successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const initialFormValues: TInitialInputsAuthFormValues = {
    userName: "",
    userCode: null,
    userGroup: "",
    userSection: null,
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: null,
    gender: null,
  };

  const { handleBlur, handleSubmit, setFieldValue, touched, values, errors } =
    useFormik({
      initialValues: initialFormValues,
      validationSchema: signupValidationSchema,
      onSubmit: async () => {
        console.log(values);

        if (!mutation.isPending) mutation.mutateAsync(values);
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

          {/* Email */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="like: ahmed@gmail.com"
            fieldName="email"
            inputName="email"
            inputType="email"
            values={values}
            iconClass="fa-solid fa-envelope"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Phone Number  */}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: 01012345678"
              fieldName="phone number"
              inputName="phoneNumber"
              inputType="number"
              values={values}
              iconClass="fa-solid fa-phone"
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
          <div className="grid grid-cols-1 items-end md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-2">
            {/* Student Group*/}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: a,b,c,d"
              fieldName="group"
              inputName="userGroup"
              inputType="text"
              values={values}
              iconClass="fa-solid fa-people-group"
            />

            {/* Student Section*/}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: 4"
              fieldName="section number"
              inputName="userSection"
              inputType="number"
              values={values}
              iconClass="fa-solid fa-user-group"
            />

            {/* Gender */}
            <Select
              choiceList={["male", "female"]}
              setFieldValue={setFieldValue}
              values={values}
              defaultValue={"gender"}
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
            {mutation.isPending && !mutation.isError ? "Loading..." : "Signup"}
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
