import { useQuery } from "@tanstack/react-query";
import { fetchCalendars } from "../api/calendarApi";

const useFetchCalendars = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["calendar"],
    queryFn: fetchCalendars,
    staleTime: import.meta.env.VITE_MODE != "dev" ? 1000 * 60 * 30 : 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { calendars: data?.calendars, isLoading, isError, error };
};

export { useFetchCalendars };
