import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { TMeRequest } from "../../../types/auth/authTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutFn } from "../../../api/authApi";

const Header = ({ user }: { user: TMeRequest }) => {
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

    if (user?.userName) {
      if (user?.userName?.split(" ").length >= 2) {
        setShortAvatarName(
          user?.userName?.split(" ")[0] + user?.userName.split(" ")[1],
        );
      }

      setShortAvatarName(user?.userName[0] + user?.userName[1]);
    }
  }, [user]);

  return (
    <>
      <div className="flex items-center gap-4 w-full h-12 bg-purple-100 shadow-sm shadow-zinc-300">
        <div className="relative flex items-center justify-between w-full max-w-[1440px] mx-auto px-2">
          {/* Drop List Popup */}
          {isActiveAvatarBar && (
            <div className="absolute right-2.5 top-[calc(100%+10px)] z-30 flex flex-col gap-2 mt-1.5 rounded text-sm bg-zinc-50 text-gray-700 p-1 px-2 outline outline-zinc-300 shadow-md">
              <Link
                to={"/profile"}
                className="flex items-baseline gap-3 text-sm px-2 w-44 py-1.5 rounded transition-all hover:bg-purple-100"
              >
                <i className="fa-regular fa-user"></i>
                <p>profile</p>
              </Link>

              <button
                onClick={() => mutateAsync()}
                className="flex items-baseline gap-3 text-sm px-2 w-44 py-1.5 rounded transition-all hover:bg-red-100 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <p>Logout</p>
              </button>
            </div>
          )}

          {/* Icon & Paths*/}
          <div className="flex items-center">
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
            </ul>
          </div>

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
