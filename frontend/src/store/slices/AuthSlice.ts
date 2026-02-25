/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TMeRequest } from "../../types/auth/authTypes";
import axios from "axios";
import { api } from "../../main";
import toast from "react-hot-toast";
import { persistor } from "../store";
import type { TUserSchemaType } from "../../types/schema/UserSchemaType";
import type { TInitialInputsAuthFormValues } from "../../types/form/formTypes";

type TAuthState = {
  user: TMeRequest | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: {
    login: string | null;
    me: string | null;
    signup: string | null;
    logout: string | null;
  };
};

export const loginAuth = createAsyncThunk(
  "auth/loginAuth",
  async (
    formData: { userCode: number; password: string },
    { rejectWithValue },
  ) => {
    try {
      const loginReq = await api.post("/auth/login", formData);
      return loginReq.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something Went Wrong!");
    }
  },
);

export const signupAuth = createAsyncThunk(
  "auth/signupAuth",
  async (formData: TInitialInputsAuthFormValues, { rejectWithValue }) => {
    try {
      const signupReq = await api.post("/auth/signup", formData);
      return signupReq.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.get("/auth/me");
      return res.data.user;
    } catch (error: any) {
      dispatch(logoutAuth());
      return rejectWithValue(error.message);
    }
  },
);

export const logoutAuth = createAsyncThunk(
  "auth/logoutAuth",
  async (_, { rejectWithValue }) => {
    try {
      const logoutReq = await api.post("/auth/logout");
      await persistor.purge();
      return logoutReq;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.message || "something went wrong");
      return rejectWithValue("something went wrong");
    }
  },
);

const initialState: TAuthState = {
  user: null,
  status: "idle",
  error: {
    login: null,
    me: null,
    signup: null,
    logout: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Me Route
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "pending";
        state.error.me = null;
      })
      .addCase(
        fetchAuth.fulfilled,
        (state, action: PayloadAction<TMeRequest>) => {
          state.user = action.payload;
          state.status = "succeeded";
        },
      )
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error.me = action.payload as string;
      })
      // Signup Route
      .addCase(signupAuth.pending, (state) => {
        state.status = "pending";
        state.error.signup = null;
      })
      .addCase(signupAuth.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = payload.user;
        toast.success(`Welcome Eng.${payload.user.userName}`);
      })
      .addCase(signupAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error.signup = action.payload as string;
        toast.error(state.error.signup);
      })
      // Login Route
      .addCase(loginAuth.pending, (state) => {
        state.status = "pending";
        state.error.me = null;
      })
      .addCase(
        loginAuth.fulfilled,
        (
          state,
          action: PayloadAction<TMeRequest & { user: TUserSchemaType }>,
        ) => {
          state.user = action.payload.user;
          state.status = "succeeded";
          toast.success("Logged in Successfully");
        },
      )
      .addCase(loginAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error.login = action.payload as string;
        toast.error(state.error.login);
      })
      // Logout Route
      .addCase(logoutAuth.pending, (state) => {
        state.status = "pending";
        state.error.logout = null;
      })
      .addCase(logoutAuth.fulfilled, (state) => {
        state.status = "succeeded";
        state.error.logout = null;
        state.user = null;
      })
      .addCase(logoutAuth.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error.logout = payload as string;
      });
  },
});

export default authSlice.reducer;
