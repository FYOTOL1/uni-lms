import { useQuery } from "@tanstack/react-query";
import { getAllUsersFn } from "../api/usersApi";
import { staleTimeLimit } from "../configs/ReactQuery";

const useFetchUsers = () => {
  const { data, isSuccess, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersFn,
    staleTime: staleTimeLimit,
  });

  return { users: data?.users, isSuccess, isLoading, isError, error, refetch };
};

export { useFetchUsers };
