import { useState } from "react";

type Props = {
  setSelectedValue: (value: string) => void;
  value: string;
  defaultValue: string;
  choiceList: string[];
};

const Select = ({
  setSelectedValue,
  choiceList,
  value,
  defaultValue,
}: Props) => {
  const [isActiveGenderPopup, setIsActiveGenderPopup] =
    useState<boolean>(false);

  return (
    <>
      <div className="relative h-9 rounded text-[14px] capitalize bg-zinc-50 outline outline-purple-300">
        <div
          onClick={() => setIsActiveGenderPopup(!isActiveGenderPopup)}
          className="flex items-baseline-last justify-between w-24 px-3 py-2 h-full cursor-pointer"
        >
          <p>{value ? value : defaultValue}</p>
          <i className="fa-solid fa-chevron-down text-purple-500"></i>
        </div>

        <div
          className={`absolute flex flex-col gap-1 mt-1 w-24 rounded ${
            !isActiveGenderPopup && "hidden"
          } bg-zinc-50 outline outline-gray-300`}
        >
          {choiceList.map((e) => (
            <div
              onClick={() => {
                setSelectedValue(e);
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

export default Select;
