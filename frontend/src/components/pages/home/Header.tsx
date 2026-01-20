import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { TMeRequest } from "../../../types/auth/meTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutFn } from "../../../api/authApi";

const Header = ({ student }: { student: TMeRequest }) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: logoutFn,
    onSuccess: async () => {
      await queryClient.setQueryData(["auth"], null);
    },
  });

  const [pathName, setPathName] = useState<string>(
    location.pathname.split("/")[1],
  );

  const [isActiveAvatarBar, setIsActiveAvatarBar] = useState<boolean>();
  const [shortAvatarName, setShortAvatarName] = useState<string>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPathName(location.pathname.split("/")[1]);

    if (student?.studentName) {
      if (student?.studentName?.split(" ").length >= 2) {
        setShortAvatarName(
          student?.studentName?.split(" ")[0] +
            student.studentName.split(" ")[1],
        );
      }

      setShortAvatarName(student.studentName[0] + student.studentName[1]);
    }
  }, [student]);

  return (
    <>
      <div className="relative flex items-center gap-4 w-full h-12 px-2 bg-purple-100 shadow-sm shadow-zinc-300">
        {/* Popup */}
        {isActiveAvatarBar && (
          <div className="absolute right-2.5 top-full flex flex-col gap-2 mt-1.5 rounded text-sm bg-zinc-50 p-1 outline outline-purple-300">
            <Link
              to={"/profile"}
              className="flex items-baseline justify-between gap-10 text-sm px-2 py-1.5 rounded transition-all hover:bg-purple-100"
            >
              <p>profile</p>
              <i className="fa-regular fa-address-card text-zinc-800"></i>
            </Link>
            <hr className="text-gray-300" />
            <button
              onClick={() => mutateAsync()}
              className="flex items-baseline justify-between gap-10 text-sm px-2 py-1.5 rounded transition-all hover:bg-red-100 cursor-pointer"
            >
              <p className="text-red-400">Logout</p>
              <i className="fa-solid fa-arrow-right-from-bracket text-red-400"></i>
            </button>
          </div>
        )}

        {/* Icon & Paths*/}
        <div className="w-full max-w-[1440px] mx-auto flex items-center">
          <Link to={"/"} className="flex items-center gap-2">
            <div className="flex items-center justify-center size-8 text-[17px] text-white bg-purple-500 p-3 rounded-full">
              <i className="fa-solid fa-building-columns"></i>
            </div>
            <h1 className="capitalize text-lg bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              uniLearn
            </h1>
          </Link>

          <ul className="flex items-center gap-5 ms-5 text-sm opacity-80">
            <li
              onClick={() => setPathName(location.pathname.split("/")[1])}
              className={`hover:text-purple-500 ${
                pathName == "" ? "text-purple-500" : ""
              } transition-all`}
            >
              <Link className="flex items-baseline gap-1" to={"/"}>
                <i className="text-[14px] fa-regular fa-house"></i>
                <p className="hidden sm:inline">Home</p>
              </Link>
            </li>
            <li
              onClick={() => setPathName(location.pathname.split("/")[1])}
              className={`hover:text-purple-500 ${
                pathName == "assignments" ? "text-purple-500" : ""
              } transition-all`}
            >
              <Link className="flex items-baseline gap-1" to={"/assignments"}>
                <i className="text-[14px] fa-solid fa-list-check"></i>
                <p className="hidden sm:inline">Assignments</p>
              </Link>
            </li>
            <li
              onClick={() => setPathName(location.pathname.split("/")[1])}
              className={`hover:text-purple-500 ${
                pathName == "calendar" ? "text-purple-500" : ""
              } transition-all`}
            >
              <Link className="flex items-baseline gap-1" to={"/calendar"}>
                <i className="text-[14px] fa-regular fa-calendar-days"></i>
                <p className="hidden sm:inline">Calendar</p>
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsActiveAvatarBar(!isActiveAvatarBar)}
              className="flex justify-center items-center uppercase text-sm text-white size-8 transition-all rounded-full bg-linear-to-r from-purple-400 to-pink-400 cursor-pointer hover:from-purple-500 hover:to-pink-500"
            >
              {shortAvatarName}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
