/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../main";
import toast from "react-hot-toast";
import type { TUserSchemaType } from "../../types/schema/UserSchemaType";

type TInitialUser = {
  user: TUserSchemaType | null;
  status: "idle" | "pending" | "fulfilled" | "failed";
  error: string | null;
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: TUserSchemaType, { rejectWithValue }) => {
    try {
      const updateUser = await api.patch("/users", data);
      return updateUser.data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Update User!");
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_id: string, { rejectWithValue }) => {
    try {
      const deleteReq = await api.delete(`/users/${_id}`);

      return deleteReq.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Delete User!");
    }
  },
);

const initialState: TInitialUser = {
  user: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Update
      .addCase(updateUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = "fulfilled";
        toast.success("Updated Successfully");
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Deleted Successfully");
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        toast.error(action.payload as string);
      }),
});

export default userSlice.reducer;
