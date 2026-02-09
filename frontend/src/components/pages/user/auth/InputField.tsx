/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type Props<T extends Record<string, any>> = {
  setFieldValue: (key: keyof T, value: string | number) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setFocusedFieldName: (value: keyof T | null) => void;
  focusAndUnfocusStyle: (value: keyof T) => string;
  values: T;
  inputPlaceholder: string;
  fieldName: string;
  inputType?: "text" | "number" | "email" | "password";
  inputName: keyof T;
  iconClass?: string;
};

const InputField = <T extends Record<string, any>>({
  setFocusedFieldName,
  setFieldValue,
  handleBlur,
  focusAndUnfocusStyle,
  inputPlaceholder,
  inputType = "text",
  fieldName,
  inputName,
  values,
  iconClass = "fa-solid fa-user",
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-1 capitalize">
      <label htmlFor={String(inputName)} className="text-sm text-[#333]">
        {fieldName}
      </label>

      <div
        className={`relative py-2 h-9 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
          inputName,
        )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
      >
        <i
          className={`absolute left-2 top-1/2 translate-y-[-45%] text-purple-500 text-sm ${iconClass}`}
        />

        <input
          type={inputType}
          name={String(inputName)}
          id={String(inputName)}
          placeholder={inputPlaceholder}
          className="w-full h-full border-none outline-none"
          value={(values[inputName] ?? "") as string | number}
          onChange={(e) => {
            const value =
              inputType === "number" ? Number(e.target.value) : e.target.value;

            setFieldValue(inputName, value);
          }}
          onBlur={(e) => {
            handleBlur(e);
            setFocusedFieldName(null);
          }}
          onFocus={() => setFocusedFieldName(inputName)}
        />
      </div>
    </div>
  );
};

export default InputField;
