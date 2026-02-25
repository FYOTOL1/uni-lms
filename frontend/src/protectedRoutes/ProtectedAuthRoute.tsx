import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchAuth } from "../store/slices/AuthSlice";

const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (status === "idle") dispatch(fetchAuth());
  }, [dispatch, status]);

  if (status == "pending")
    return (
      <div className="relative min-h-screen h-full w-full">
        <div className="absolute h-full w-full bg-black opacity-50 z-20"></div>
        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 text-2xl">
          Loading...
        </div>
      </div>
    );

  if (user) return <Navigate to={"/"} replace />;

  return <>{children}</>;
};

export default ProtectedAuthRoute;
