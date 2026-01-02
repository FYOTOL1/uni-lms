import { Navigate } from "react-router";

const WelcomePage = () => {
  return (
    <div>
      <Navigate to={"/auth/signup"} />
    </div>
  );
};

export default WelcomePage;
