import { useState, type ReactNode } from "react";
import PathsBar from "./PathsBar";
import Header from "./Header";
import type { TMeRequest } from "../../../types/auth/authTypes";

const AdminLayout = ({
  user,
  children,
}: {
  user: TMeRequest;
  children: ReactNode;
}) => {
  const [pathsBarIsActive, setPathsBarIsActive] = useState<boolean>(true);

  return (
    <div className="relative grid grid-cols-12 gap-4 bg-blue-50 max-w-[1440px] mx-auto  min-h-screen">
      {/* Left Side Navigation */}
      <div className={pathsBarIsActive ? "col-span-3" : "col-span-1"}>
        <PathsBar
          pathsBarIsActive={pathsBarIsActive}
          setPathsBarIsActive={setPathsBarIsActive}
        />
      </div>

      {/* Right Side Dashboard */}
      <div className={pathsBarIsActive ? "col-span-9" : "col-span-11"}>
        <Header user={user} />
        <div className="mt-6 pe-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
