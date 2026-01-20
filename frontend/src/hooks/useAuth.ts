import { useQuery } from "@tanstack/react-query";
import { checkAuthed } from "../api/authApi";
import type { TMeRequest } from "../types/auth/meTypes";

const useAuth = () => {
  const { data, error, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthed,
    retry: true,
    staleTime: 1000 * 3,
  });

  return {
    isLogged: !!data?.student,
    student: data?.student as TMeRequest,
    isLoading,
    isSuccess,
    refetch,
    error,
  };
};

export default useAuth;
