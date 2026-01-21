import type { TMeRequest } from "../../../types/auth/meTypes";

const WelcomeMessage = ({ user }: { user: TMeRequest }) => {
  return (
    <>
      <div className="w-full">
        <h1 className="text-4xl font-semibold text-[#333]">
          Welcome back,{" "}
          <span className="capitalize bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {user && user?.userName?.split(" ")[0]}!
          </span>
        </h1>

        <p className="text-xs text-gray-600">
          Continue your learning journey and achieve your goals.
        </p>
      </div>
    </>
  );
};

export default WelcomeMessage;
