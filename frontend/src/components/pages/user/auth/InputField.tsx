import React from "react";

type StringFieldKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

type Props<T> = {
  setFieldValue: (key: keyof T, value: string | number) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  setFocusedFieldName: (value: string | null) => void;
  focusAndUnfocusStyle: (value: keyof T) => void;
  values: T;
  inputPlaceholder: string;
  fieldName: string;
  inputType?: "text" | "number" | "email" | "password";
  inputName: StringFieldKeys<T>;
  iconClass?: string;
};

const InputField = <T,>({
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
          value={(values[inputName] || "") as string | number}
          onChange={(e) =>
            setFieldValue(
              inputName,
              inputType === "text" || inputType === "email"
                ? e.target.value.toLowerCase()
                : e.target.value,
            )
          }
          onBlur={(e) => {
            handleBlur(e);
            setFocusedFieldName(null);
          }}
          onFocus={() => setFocusedFieldName(String(inputName))}
        />
      </div>
    </div>
  );
};

export default InputField;
