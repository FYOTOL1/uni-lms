import { useQuery } from "@tanstack/react-query";
import { checkAuthed } from "../api/authApi";

const useAuth = () => {

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthed,
    retry: false,
  });

  return {
    student: data?.student,
    error,
    isLogged: !!data?.student,
    isLoading,
    refetch,
  };
};

export default useAuth;
