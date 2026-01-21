import { useQuery } from "@tanstack/react-query";
import { checkAuthed } from "../api/authApi";
import type { TMeRequest } from "../types/auth/meTypes";

const useAuth = () => {
  const { data, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthed,
    staleTime: 1000 * 10,

    retry: false,
  });

  return {
    isLogged: !!data?.user,
    user: data?.user as TMeRequest,
    isLoading,
    isSuccess,
    refetch,
    error,
  };
};

export default useAuth;
