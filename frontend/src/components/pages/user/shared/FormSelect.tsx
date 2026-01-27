/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

type Props<T> = {
  setFieldValue: (key: keyof T, value: string) => void;
  values: T;
  defaultValue: keyof T | "day";
  choiceList: string[];
  styleWidth?: string;
};

const FromSelect = <T extends Record<string, any>>({
  setFieldValue,
  choiceList,
  values,
  defaultValue,
  styleWidth,
}: Props<T>) => {
  const [isActiveGenderPopup, setIsActiveGenderPopup] =
    useState<boolean>(false);

  return (
    <>
      <div className="relative h-9 rounded text-[14px] capitalize bg-zinc-50 outline outline-purple-300">
        <div
          onClick={() => setIsActiveGenderPopup(!isActiveGenderPopup)}
          className={`flex items-baseline-last justify-between px-3 py-2 ${
            styleWidth ? styleWidth : "w-full"
          }  h-full cursor-pointer`}
        >
          <p>
            {values[defaultValue]
              ? String(values[defaultValue])
              : String(defaultValue)}
          </p>
          <i className="fa-solid fa-chevron-down text-purple-500"></i>
        </div>

        <div
          className={`absolute flex flex-col gap-1 mt-1 w-full rounded ${
            !isActiveGenderPopup && "hidden"
          } bg-zinc-50 outline outline-gray-300`}
        >
          {choiceList.map((e) => (
            <div
              onClick={() => {
                setFieldValue(defaultValue, e);
                setIsActiveGenderPopup(false);
              }}
              className="w-full py-1.5 z-30 px-3 capitalize transition-all bg-zinc-50 hover:bg-zinc-200 cursor-pointer "
            >
              {e}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FromSelect;
