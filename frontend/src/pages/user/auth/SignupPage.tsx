import SignupForm from "../../../forms/signup/SignupForm";
import ProtectedAuthRoute from "../../../protectedRoutes/ProtectedAuthRoute";

const SignupPage = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-[#eee]">
      <ProtectedAuthRoute>
        <SignupForm />
      </ProtectedAuthRoute>
    </div>
  );
};

export default SignupPage;
