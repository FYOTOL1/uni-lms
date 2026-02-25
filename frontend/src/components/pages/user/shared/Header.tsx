import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import AvatarBar from "../../../shared/AvatarBar";

const Header = ({ user }: { user: TMeRequest }) => {
  const [pathName, setPathName] = useState<string>(
    location.pathname.split("/")[1],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPathName(location.pathname.split("/")[1]);
  }, [user]);

  return (
    <>
      <div className="flex items-center gap-4 w-full h-14 bg-purple-100 shadow-sm shadow-zinc-300">
        <div className="relative flex items-center justify-between w-full max-w-[1440px] mx-auto px-2">
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

          <AvatarBar
            avatarDropList={[
              {
                name: "dashboard",
                path: "/admin/dashboard",
                icon: "fa-solid fa-user-tie",
                blackList: ["student"],
              },
            ]}
            user={user}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
