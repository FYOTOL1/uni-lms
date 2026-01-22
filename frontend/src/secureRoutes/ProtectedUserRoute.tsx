/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import type { TMeRequest } from "../types/auth/meTypes";

const ProtectedUserRoute = ({
  children,
}: {
  children: (user: TMeRequest) => any | void;
}) => {
  const navigate = useNavigate();
  const { user, isLoading, isLogged } = useAuth();

  if (isLoading)
    return (
      <div className="relative h-screen w-full">
        <div className="absolute h-full w-full bg-black opacity-50 z-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 text-2xl">
          Loading...
        </div>
        <div className="z-10">{children(user)}</div>
      </div>
    );

  if (!isLogged) return navigate("/auth/login", { replace: true });

  return children(user);
};

export default ProtectedUserRoute;
