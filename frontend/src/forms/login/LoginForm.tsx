import { useFormik } from "formik";
import { useState } from "react";
import InputField from "../../components/pages/auth/InputField";
import { Link, useNavigate } from "react-router";
import type { TInitialInputsAuthFormValues } from "../../types/form/formTypes";
import loginValidationSchema from "./Validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginFn } from "../../api/authApi";
import toast from "react-hot-toast";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const initialFormValues: TInitialInputsAuthFormValues = {
    userCode: null,
    password: "",
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginFn,
    retry: false,
    onSuccess: (res) => {
      navigate("/");
      queryClient.setQueryData(["auth"], null);
      toast.success(String(res.message).toLowerCase());
    },
    onError: (err) => {
      toast.error(String(err.message).toLowerCase() || "something went wrong!");
    },
  });

  const { handleBlur, handleSubmit, setFieldValue, touched, values, errors } =
    useFormik({
      initialValues: initialFormValues,
      validationSchema: loginValidationSchema,
      onSubmit: () => {
        if (!isPending) mutateAsync(values);
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
          {/* Student Code */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="student code..."
            fieldName="student code"
            inputName="userCode"
            values={values}
          />

          {/* Password */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="******"
            fieldName="password"
            inputName="password"
            inputType="password"
            values={values}
          />

          {/* Submit Button */}
          <button className="py-2 text-[16px] bg-purple-600 h-fit mt-auto rounded text-white cursor-pointer transition-all hover:bg-purple-700 focus:bg-purple-700">
            {isPending ? "Loading..." : "Login"}
          </button>
          <hr className="text-gray-300" />
          <div className="flex justify-center w-full gap-2 text-sm">
            <p>Don't Have an Account?</p>
            <button className="text-purple-600 underline">
              <Link to={"/auth/signup"}>Signup</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
