import { useQuery } from "@tanstack/react-query";
import { getAllSubjectsFn, getOneSubjectsFn } from "../api/subjectApi";
import { staleTimeLimit } from "../configs/ReactQuery";
import { useEffect } from "react";
import toast from "react-hot-toast";

const useFetchSubjects = () => {
  const { data, isLoading, isSuccess, isFetched, isError, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: getAllSubjectsFn,
    staleTime: import.meta.env.VITE_MODE != "dev" ? 1000 * 60 * 30 : 1000 * 10,
  });

  useEffect(() => {
    if (isFetched && error) {
      toast.error(error?.message || "Failed To Get Subjects!");
    }
  }, [error, isFetched]);

  return { subjects: data?.subjects, isSuccess, isLoading, isError, error };
};

const useFetchOneSubject = (subjectCode: string) => {
  const { data, isLoading, isSuccess, isFetched, error } = useQuery({
    queryKey: ["subjects", subjectCode],
    queryFn: () => getOneSubjectsFn(subjectCode),
    staleTime: staleTimeLimit,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFetched && error) {
      toast.error(error?.message || "Failed To Get Subjects!");
    }
  }, [error, isFetched]);

  return { subject: data?.subject, isSuccess, isLoading, error };
};

export { useFetchSubjects, useFetchOneSubject };
