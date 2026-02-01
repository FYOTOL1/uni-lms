/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../main";
import type { TInitialInputsAuthFormValues } from "../types/form/formTypes";

const signupFn = async (signupFormData: TInitialInputsAuthFormValues) => {
  const signupReq = await api.post("/auth/signup", signupFormData, {
    withCredentials: true,
  });

  return signupReq.data;
};

const loginFn = async (loginFormData: TInitialInputsAuthFormValues) => {
  const loginReq = await api.post("/auth/login", loginFormData);
  return loginReq.data;
};

const logoutFn = async () => {
  const logoutReq = await api.post("/auth/logout");

  return logoutReq;
};

const checkAuthed = async () => {
  try {
    const getStudentAuthedData = await api.get("/auth/me");
    return getStudentAuthedData.data;
  } catch (error: any) {
    throw error;
  }
};

export { signupFn, loginFn, logoutFn, checkAuthed };
