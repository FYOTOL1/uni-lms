import { useQuery } from "@tanstack/react-query";
import { getAllUsersFn } from "../api/usersApi";

const useFetchUsers = () => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersFn,
  });

  return { users: data?.users, isSuccess, isLoading, isError, error };
};

export { useFetchUsers };
