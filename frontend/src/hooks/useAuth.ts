import { useQuery } from "@tanstack/react-query";
import { checkAuthed } from "../api/authApi";
import type { TMeRequest } from "../types/auth/authTypes";

const useAuth = () => {
  const { data, error, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthed,
    retry: (failureCount, error) => {
      if (error?.response?.status == 404) return false;
      if (failureCount >= 3) return false;
      return true;
    },
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
