import { useQuery } from "@tanstack/react-query";
import { getAllSubjectsFn, getOneSubjectsFn } from "../api/subjectApi";

const useFetchSubjects = () => {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: getAllSubjectsFn,
    staleTime: import.meta.env.VITE_MODE != "dev" ? 1000 * 60 * 30 : 1000,
    retry: false,
  });

  return { subjects: data?.subjects, isSuccess, isLoading, isError, error };
};

const useFetchOneSubject = (subjectCode: string) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getOneSubjectsFn(subjectCode),
    staleTime: import.meta.env.VITE_MODE != "dev" ? 1000 * 60 * 30 : 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return { subject: data?.subject, isSuccess, isLoading, isError, error };
};

export { useFetchSubjects, useFetchOneSubject };
