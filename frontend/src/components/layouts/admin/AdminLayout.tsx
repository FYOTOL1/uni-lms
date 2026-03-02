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
  const [pathsBarIsActive, setPathsBarIsActive] = useState<boolean>(false);

  return (
    <div className="relative flex gap-4 bg-blue-50 max-w-[1440px] mx-auto  min-h-screen">
      {/* Left Side Navigation */}
      <PathsBar
        pathsBarIsActive={pathsBarIsActive}
        setPathsBarIsActive={setPathsBarIsActive}
      />

      {/* Right Side Dashboard */}
      <div className={"w-full"}>
        <Header user={user} />
        <div className="mt-6 pe-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
