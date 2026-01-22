import { useQuery } from "@tanstack/react-query";
import { checkAuthed } from "../api/authApi";
import type { TMeRequest } from "../types/auth/meTypes";

const useAuth = () => {
  const { data, error, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthed,
    retry: false,
  });

  return {
    isLogged: !!data?.user,
    user: data?.user as TMeRequest,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
};

export default useAuth;
