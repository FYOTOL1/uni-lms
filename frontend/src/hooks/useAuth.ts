/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { checkAuthed } from "../api/authApi";
import type { TMeRequest } from "../types/auth/authTypes";
import { staleTimeLimit } from "../configs/ReactQuery";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useAuth = () => {
  const { data, error, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthed,
    staleTime: staleTimeLimit,
    retry: (failureCount, error: any) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status == 401 || status == 404) return false;
      }
      if (failureCount >= 3) return false;
      return true;
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retryOnMount: false,
  });

  const canToast = useRef(false);
  useEffect(() => {
    if (error && canToast) {
      toast.error(
        String(error.message).toLowerCase() || "Something Went Wrong!",
      );

      canToast.current = false;

      const timer = setTimeout(() => (canToast.current = true), 3000);

      return () => clearTimeout(timer);
    }
  }, [canToast, error]);

  return {
    user: data?.user as TMeRequest,
    isLogged: !!data?.user,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  };
};

export default useAuth;
