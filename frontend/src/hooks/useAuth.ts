/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { checkAuthed } from "../api/authApi";
import type { TMeRequest } from "../types/auth/authTypes";
import { staleTimeLimit } from "../configs/ReactQuery";

const useAuth = () => {
  const { data, error, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthed,
    staleTime: staleTimeLimit,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: (failureCount, error: any) => {
      if (error?.response?.status == 404) return false;
      if (failureCount >= 3) return false;
      return true;
    },
  });

  return {
    user: data?.user as TMeRequest,
    isLogged: !!data?.user,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
};

export default useAuth;
