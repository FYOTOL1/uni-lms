import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router";
import { logoutFn } from "../../../../api/authApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [pathName, setPathName] = useState("Users");
  const [shortAvatarName, setShortAvatarName] = useState("Users");
  const [isActiveAvatarBar, setIsActiveAvatarBar] = useState<boolean>();

  const { mutateAsync } = useMutation({
    mutationFn: logoutFn,
    onSuccess: async () => {
      await queryClient.setQueryData(["auth"], null);
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPathName(location.pathname.split("/")[2]);

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
      <div className="relative flex items-center justify-between bg-zinc-50 w-full outline outline-zinc-200 p-4">
        {isActiveAvatarBar && (
          <div className="absolute right-2.5 top-[calc(100%+6px)] z-30 flex flex-col gap-2 mt-1.5 rounded text-sm bg-zinc-50 text-gray-700 p-1 px-2 outline outline-zinc-300 shadow-md">
            <Link
              to={"/profile"}
              className="flex items-baseline gap-3 text-sm px-2 w-44 py-2 rounded transition-all hover:bg-purple-100"
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

        {/* Path Name */}
        <h1 className="text-xl font-semibold capitalize text-gray-800">
          {pathName}
        </h1>

        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsActiveAvatarBar(!isActiveAvatarBar)}
              className="flex justify-center items-center uppercase text-sm text-white size-10 transition-all rounded-full bg-linear-to-r from-purple-400 to-pink-400 cursor-pointer hover:from-purple-500 hover:to-pink-500"
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
