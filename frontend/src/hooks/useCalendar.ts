import { useQuery } from "@tanstack/react-query";
import { fetchCalendars } from "../api/calendarApi";
import { staleTimeLimit } from "../configs/ReactQuery";
import { useEffect } from "react";
import toast from "react-hot-toast";

const useFetchCalendars = () => {
  const { data, isLoading, isError, error, isFetched, isSuccess } = useQuery({
    queryKey: ["calendars"],
    queryFn: fetchCalendars,
    staleTime: staleTimeLimit,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (isFetched && error) {
      toast.error(error.message || "Failed To Get Subjects!");
    }
  }, [error, isFetched]);

  return { calendars: data?.calendars, isLoading, isError, isSuccess, error };
};

export { useFetchCalendars };
