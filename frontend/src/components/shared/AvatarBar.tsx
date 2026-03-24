/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import type { TMeRequest } from "../../types/auth/authTypes";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/reduxHook";
import { logoutAuth } from "../../store/slices/AuthSlice";
import toast from "react-hot-toast";

type TProps = {
  user: TMeRequest;
  avatarDropList: {
    name: string;
    path: string;
    icon: string;
    blackList: string[];
  }[];
};

const AvatarBar = ({ user, avatarDropList }: TProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isActiveAvatarBar, setIsActiveAvatarBar] = useState<boolean>();
  const [shortAvatarName, setShortAvatarName] = useState<string>("NN");
  const [lastPathName, setLastPathName] = useState<string>("");

  useEffect(() => {
    if (user?.userName) {
      if (user?.userName?.split(" ").length >= 2) {
        setShortAvatarName(
          user?.userName?.split(" ")[0] + user?.userName?.split(" ")[1],
        );
      }

      setShortAvatarName(user?.userName[0] + user?.userName[1]);
    }
    setLastPathName(
      location.pathname.split("/")[location.pathname.split("/").length - 1],
    );
  }, [user]);

  return (
    <>
      {isActiveAvatarBar && (
        <div className="absolute right-2.5 top-[calc(100%+10px)] z-30 flex flex-col gap-2 mt-1.5 rounded text-sm capitalize bg-zinc-50 text-gray-700 p-1 px-2 outline outline-zinc-300 shadow-md">
          {avatarDropList.map((e) => {
            if (e?.blackList?.some((s) => s == user.role)) return null;

            if (lastPathName !== e.name) {
              return (
                <Link
                  key={e.path}
                  to={e.path}
                  className="flex items-baseline gap-3 text-sm px-2 w-44 py-1.5 rounded transition-all hover:bg-purple-100"
                >
                  <i className={e.icon}></i>
                  <p>{e.name}</p>
                </Link>
              );
            }
          })}

          <button
            onClick={() =>
              dispatch(logoutAuth()).then(() => {
                navigate("/auth/login");
                toast.success("Logged out Successfully");
              })
            }
            className="flex items-baseline gap-3 text-sm px-2 w-44 py-1.5 rounded transition-all hover:bg-red-100 cursor-pointer"
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <p>Logout</p>
          </button>
        </div>
      )}
      <button
        onClick={() => setIsActiveAvatarBar(!isActiveAvatarBar)}
        className="flex justify-center items-center uppercase text-sm text-white size-8 transition-all rounded-full bg-linear-to-r from-purple-400 to-pink-400 cursor-pointer hover:from-purple-500 hover:to-pink-500"
      >
        {shortAvatarName}
      </button>
    </>
  );
};

export default AvatarBar;
