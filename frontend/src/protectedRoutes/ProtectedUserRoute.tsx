import { Navigate } from "react-router";
import type { TMeRequest } from "../types/auth/authTypes";
import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { fetchAuth } from "../store/slices/AuthSlice";

const ProtectedUserRoute = ({
  children,
}: {
  children: (user: TMeRequest) => ReactNode;
}) => {
  const { user, status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status == "idle") dispatch(fetchAuth());
  }, [dispatch, status]);

  if (status == "pending")
    return (
      <div className="relative min-h-screen h-full w-full">
        <div className="absolute h-full w-full bg-black opacity-50 z-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 text-2xl">
          Loading...
        </div>
        <div className="z-10">{children(user!)}</div>
      </div>
    );

  if (!user) return <Navigate to={"/auth/login"} replace />;

  return user && <>{children(user)}</>;
};

export default ProtectedUserRoute;
