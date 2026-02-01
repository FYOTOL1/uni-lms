import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TMeRequest } from "../../types/auth/authTypes";
import axios from "axios";
import { api } from "../../main";

type TAuthState = {
  user: TMeRequest | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
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
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data.message || "Unauthorized");
      return rejectWithValue("Something Went Wrong!");
    }
  },
);

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (_, { rejectWithValue }) => {
    try {
      const getStudentAuthedData = await api.get("/auth/me");
      return getStudentAuthedData.data.user;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(error.response?.data.message || "Unauthorized");
      return rejectWithValue("Something Went Wrong!");
    }
  },
);

export const logoutAuth = createAsyncThunk(
  "auth/logoutAuth",
  async (_, { rejectWithValue }) => {
    try {
      const logoutReq = await api.post("/auth/logout");

      return logoutReq;
    } catch (error) {
      if (axios.isAxiosError(error))
        return rejectWithValue(
          error.response?.data.message || "something went wrong",
        );
      return rejectWithValue("something went wrong");
    }
  },
);

const initialState: TAuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Me Route
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
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
        state.error = action.payload as string;
      })
      // Login Route
      .addCase(loginAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        loginAuth.fulfilled,
        (state, action: PayloadAction<TMeRequest>) => {
          state.user = action.payload;
          state.status = "succeeded";
        },
      )
      .addCase(loginAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Logout Route
      .addCase(logoutAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logoutAuth.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
        state.user = null;
      })
      .addCase(logoutAuth.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload as string;
      });
  },
});

export default authSlice.reducer;
