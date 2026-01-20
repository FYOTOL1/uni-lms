import React from "react";
import type { TInitialInputsAuthFormValues } from "../../../types/form/formTypes";

type Props = {
  setFieldValue: (key: string, value: string | number) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setFocusedFieldName: (value: string | null) => void;
  focusAndUnfocusStyle: (value: string) => void;
  values: TInitialInputsAuthFormValues;
  inputPlaceholder: string;
  fieldName: string;
  inputType?: "text" | "number" | "email" | "password";
  inputName: keyof TInitialInputsAuthFormValues;
  iconClass?: string;
};

const InputField = ({
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
}: Props) => {
  return (
    <div className="flex flex-col gap-2 capitalize">
      <label htmlFor={inputName} className="text-sm text-[#333]">
        {fieldName}
      </label>
      <div
        className={`relative py-2 h-9 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
          inputName
        )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
      >
        <i
          className={`absolute left-2 top-1/2 translate-y-[-45%] text-purple-500 text-sm ${iconClass}`}
        ></i>
        <input
          onChange={(e) =>
            setFieldValue(
              inputName,
              inputType == "text" || inputType == "email"
                ? e.target.value.toLowerCase()
                : e.target.value
            )
          }
          value={values[inputName] || ""}
          onBlur={(e) => {
            handleBlur(e);
            setFocusedFieldName(null);
          }}
          onFocus={() => setFocusedFieldName(inputName)}
          id={inputName}
          className="w-full h-full border-none outline-none"
          type={inputType}
          placeholder={inputPlaceholder}
          name={inputName}
        />
      </div>
    </div>
  );
};

export default InputField;
