/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../../main";
import toast from "react-hot-toast";
import type { TAssignmentSchemaType } from "../../types/schema/AssignmentSchemaType";

type TInitialAssignment = {
  assignments: TAssignmentSchemaType[] | null;
  status: "idle" | "pending" | "fulfilled" | "failed";
  error: string | null;
};

export const getAssignments = createAsyncThunk(
  "assignment/getAssignments",
  async (_, { rejectWithValue }) => {
    try {
      const Assignments = await api.get("/assignments");
      return Assignments.data.assignments;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Get Assignments!");
    }
  },
);

export const createAssignment = createAsyncThunk(
  "assignment/createAssignment",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const Assignment = await api.post(`/assignments`, formData);

      return Assignment.data.assignment;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Create Assignment!");
    }
  },
);

export const updateAssignment = createAsyncThunk(
  "assignment/updateAssignment",
  async (
    { _id, formData }: { _id: string; formData: FormData },
    { rejectWithValue },
  ) => {
    try {
      const Assignment = await api.patch(`/assignments/${_id}`, formData);

      return Assignment.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Update Assignment!");
    }
  },
);

export const deleteAssignment = createAsyncThunk(
  "assignment/deleteAssignment",
  async (_id: string, { rejectWithValue }) => {
    try {
      const Assignment = await api.delete(`/assignments/${_id}`);

      return Assignment.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Delete Assignment!");
    }
  },
);

const initialState: TInitialAssignment = {
  assignments: null,
  status: "idle",
  error: null,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder

      // Get Assignments
      .addCase(getAssignments.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        getAssignments.fulfilled,
        (state, action: PayloadAction<TAssignmentSchemaType[]>) => {
          state.status = "fulfilled";
          state.assignments = action.payload;
          state.error = null;
        },
      )
      .addCase(getAssignments.rejected, (state, action) => {
        state.status = "fulfilled";
        state.assignments = null;
        state.error = action.payload as string;
      })

      // Create Assignment
      .addCase(createAssignment.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createAssignment.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Assignment Created Successfully!");
        state.error = null;
      })
      .addCase(createAssignment.rejected, (state, action) => {
        state.status = "failed";
        state.assignments = null;
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })

      // Update Assignment
      .addCase(updateAssignment.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(updateAssignment.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Assignment Updated Successfully!");
        state.error = null;
      })
      .addCase(updateAssignment.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })

      // Delete Assignment
      .addCase(deleteAssignment.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteAssignment.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Assignment Deleted Successfully!");
        state.error = null;
      })
      .addCase(deleteAssignment.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload as string);
        state.error = action.payload as string;
      }),
});

export default assignmentSlice.reducer;
