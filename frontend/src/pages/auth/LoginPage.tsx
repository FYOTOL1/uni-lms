import LoginForm from "../../forms/login/LoginForm";
import ProtectedAuthRoute from "../../protectedRoutes/ProtectedAuthRoute";

const LoginPage = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-[#eee]">
      <ProtectedAuthRoute>
        <LoginForm />
      </ProtectedAuthRoute>
    </div>
  );
};

export default LoginPage;
