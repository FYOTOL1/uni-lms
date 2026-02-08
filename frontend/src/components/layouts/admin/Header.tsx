import type { TMeRequest } from "../../../types/auth/authTypes";
import AvatarBar from "../../shared/AvatarBar";

const Header = ({ user }: { user: TMeRequest }) => {
  return (
    <>
      <div className="relative flex items-center justify-between h-16 px-4 bg-white shadow-sm outline outline-zinc-100 rounded-s-sm">
        <h1 className="text-xl capitalize font-semibold text-zinc-800">
          {location.pathname.split("/")[2]}
        </h1>

        <AvatarBar
          avatarDropList={[
            {
              name: "profile",
              path: "/profile",
              icon: "fa-regular fa-user",
              blackList: [""],
            },
            {
              name: "home",
              path: "/",
              icon: "fa-regular fa-home",
              blackList: [""],
            },
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
    </>
  );
};

export default Header;
