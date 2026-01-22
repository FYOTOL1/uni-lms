import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";

const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isLogged } = useAuth();

  if (isLoading)
    return (
      <div className="relative h-screen w-full">
        <div className="absolute h-full w-full bg-black opacity-50 z-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 text-2xl">
          Loading...
        </div>
        <div className="z-10">{children}</div>
      </div>
    );

  if (isLogged) return <Navigate to={"/"} replace />;

  return !isLogged && children;
};

export default ProtectedAuthRoute;
