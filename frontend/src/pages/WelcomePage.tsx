import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import { logoutFn } from "../api/authApi";

const WelcomePage = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: logoutFn,
    onSuccess: async (res) => {
      console.log(res.data);
      await queryClient.setQueryData(["auth"], null);
    },
  });

  return (
    <>
      <div className="flex items-center justify-center gap-5 bg-blue-50 h-16">
        <Link
          className="p-2 px-4 bg-blue-500 rounded text-white"
          to="/auth/signup"
        >
          <button>Signup</button>
        </Link>
        <Link
          className="p-2 px-4 bg-blue-500 rounded text-white"
          to="/auth/login"
        >
          <button>login</button>
        </Link>

        <button
          className="p-2 px-4 bg-blue-500 rounded text-white"
          onClick={() => mutateAsync()}
        >
          logout
        </button>
      </div>
    </>
  );
};

export default WelcomePage;
