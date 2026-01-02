import { useFormik } from "formik";
import { useState } from "react";
import signUpSchema from "./Validation";

type TInitialFormValues = {
  studentName: string;
  studentCode: number | null;
  studentGroup: string;
  studentSection: number | null;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const initialFormValues: TInitialFormValues = {
    studentName: "",
    studentCode: null,
    studentGroup: "",
    studentSection: null,
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleChange,
    touched,
    values,
    errors,
  } = useFormik({
    initialValues: initialFormValues,
    validationSchema: signUpSchema,
    onSubmit: () => {},
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
            This is System Has No Relationship With <br /> SGU Management
          </h2>
        </div>

        {/* Form inputs */}
        <form onSubmit={handleSubmit} className="grid gap-4 items-center ">
          {/* Student Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="studentName" className="text-sm text-[#333]">
              Student Name
            </label>
            <div
              className={`relative py-2 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
                "studentName"
              )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
            >
              <i className="absolute left-2 top-1/2 translate-y-[-50%] text-purple-500 text-sm fa-solid fa-user"></i>
              <input
                onChange={(e) =>
                  setFieldValue("studentName", e.target.value.toLowerCase())
                }
                value={values.studentName}
                onBlur={(e) => {
                  handleBlur(e);
                  setFocusedFieldName(null);
                }}
                onFocus={() => setFocusedFieldName("studentName")}
                id="studentName"
                className="w-full h-full border-none outline-none"
                type="text"
                placeholder="as: kareem hamed..."
                name="studentName"
              />
            </div>
          </div>

          {/*  Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-[#333]">
              Email
            </label>
            <div
              className={`relative py-2 transition-all outline outline-purple-300  ${focusAndUnfocusStyle(
                "email"
              )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
            >
              <i className="absolute left-2 top-1/2 translate-y-[-50%] text-purple-500 text-sm fa-solid fa-envelope"></i>
              <input
                onChange={(e) =>
                  setFieldValue("email", e.target.value.toLowerCase())
                }
                value={values.email == null ? "" : values.email}
                onBlur={(e) => {
                  handleBlur(e);
                  setFocusedFieldName(null);
                }}
                onFocus={() => setFocusedFieldName("email")}
                id="email"
                className="lowercase w-full h-full border-none outline-none"
                type="text"
                placeholder="as: student@gmail.com..."
                name="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm text-[#333]">
              Password
            </label>
            <div
              className={`relative py-2 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
                "password"
              )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
            >
              <i className="absolute left-2 top-1/2 translate-y-[-50%] text-purple-500 text-sm fa-solid fa-lock"></i>
              <input
                onChange={handleChange}
                value={values.password == null ? "" : values.password}
                onBlur={(e) => {
                  handleBlur(e);
                  setFocusedFieldName(null);
                }}
                onFocus={() => setFocusedFieldName("password")}
                id="password"
                className="w-full h-full border-none outline-none"
                type="text"
                placeholder="as: ahmed_2026..."
                name="password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-sm text-[#333]">
              Confirm Password
            </label>
            <div
              className={`relative py-2 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
                "confirmPassword"
              )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
            >
              <i className="absolute left-2 top-1/2 translate-y-[-50%] text-purple-500 text-[16px] fa-regular fa-square-check"></i>
              <input
                onChange={handleChange}
                value={
                  values.confirmPassword == null ? "" : values.confirmPassword
                }
                onBlur={(e) => {
                  handleBlur(e);
                  setFocusedFieldName(null);
                }}
                onFocus={() => setFocusedFieldName("confirmPassword")}
                id="confirmPassword"
                className="w-full h-full border-none outline-none"
                type="text"
                placeholder="as: ahmed_2026..."
                name="confirmPassword"
              />
            </div>
          </div>

          {/* Student Group & Section & Submit Button */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Student Code */}
            <div className="flex flex-col gap-2">
              <label htmlFor="studentCode" className="text-sm text-[#333]">
                Student Code
              </label>
              <div
                className={`relative py-2 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
                  "studentCode"
                )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
              >
                <i className="absolute left-2 top-1/2 translate-y-[-50%] text-purple-500 text-sm fa-solid fa-hashtag"></i>
                <input
                  onChange={handleChange}
                  value={values.studentCode == null ? "" : values.studentCode}
                  onBlur={(e) => {
                    handleBlur(e);
                    setFocusedFieldName(null);
                  }}
                  onFocus={() => setFocusedFieldName("studentCode")}
                  id="studentCode"
                  className="w-full h-full border-none outline-none"
                  type="number"
                  placeholder="as: 251234"
                  name="studentCode"
                />
              </div>
            </div>

            {/* Student Group*/}
            <div className="flex flex-col gap-2">
              <label htmlFor="studentGroup" className="text-sm text-[#333]">
                Group
              </label>
              <div
                className={`relative py-2 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
                  "studentGroup"
                )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
              >
                <i className="absolute left-2 top-1/2 translate-y-[-50%] text-purple-500 text-[16px] fa-solid fa-people-group"></i>
                <input
                  onChange={(e) =>
                    setFieldValue("studentGroup", e.target.value.toUpperCase())
                  }
                  value={values.studentGroup == null ? "" : values.studentGroup}
                  onBlur={(e) => {
                    handleBlur(e);
                    setFocusedFieldName(null);
                  }}
                  onFocus={() => setFocusedFieldName("studentGroup")}
                  id="studentGroup"
                  className="w-full h-full border-none outline-none"
                  type="text"
                  placeholder="as: A"
                  name="studentGroup"
                />
              </div>
            </div>

            {/* Student Section*/}
            <div className="flex flex-col gap-2">
              <label htmlFor="studentSection" className="text-sm text-[#333]">
                Section Number
              </label>
              <div
                className={`relative py-2 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
                  "studentSection"
                )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
              >
                <i className="absolute left-2 top-1/2 translate-y-[-50%] text-purple-500 text-[16px] fa-solid fa-clipboard-list"></i>
                <input
                  onChange={handleChange}
                  value={
                    values.studentSection == null ? "" : values.studentSection
                  }
                  onBlur={(e) => {
                    handleBlur(e);
                    setFocusedFieldName(null);
                  }}
                  onFocus={() => setFocusedFieldName("studentSection")}
                  id="studentSection"
                  className="w-full h-full border-none outline-none"
                  type="number"
                  placeholder="as: 4"
                  name="studentSection"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="py-2 text-sm bg-purple-600 h-fit mt-auto rounded text-white cursor-pointer transition-all hover:bg-purple-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
