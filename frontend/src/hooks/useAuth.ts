import { useQuery } from "@tanstack/react-query";
import { checkAuthed } from "../api/authApi";

const useAuth = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthed,
    retry: false,
  });

  return {
    isLogged: !!data?.student,
    student: data?.student,
    isLoading,
    refetch,
    error,
  };
};

export default useAuth;
