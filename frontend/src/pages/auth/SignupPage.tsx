import { Navigate } from "react-router";
import SignupForm from "../../forms/signup/SignupForm";
import useAuth from "../../hooks/useAuth";

const SignupPage = () => {
  const { student, isLoading, isLogged } = useAuth();

  if (student) return <Navigate to={"/"} replace />;

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <h1 className="text-blue-500 text-2xl">Loading...</h1>
      </div>
    );

  return (
    !isLogged && (
      <div className="relative flex justify-center items-center min-h-screen w-full bg-[#eee]">
        <SignupForm />
      </div>
    )
  );
};

export default SignupPage;
