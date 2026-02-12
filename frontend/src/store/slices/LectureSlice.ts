/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../../main";
import toast from "react-hot-toast";
import type { TLectureSchemaType } from "../../types/schema/LectureSchemaType";

type TInitialLecture = {
  lectures: TLectureSchemaType[] | null;
  status: "idle" | "pending" | "fulfilled" | "failed";
  error: string | null;
};

export const getLectures = createAsyncThunk(
  "lecture/getLectures",
  async (_, { rejectWithValue }) => {
    try {
      const lectures = await api.get("/lectures");
      return lectures.data.lectures;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Get Lectures!");
    }
  },
);

export const createLecture = createAsyncThunk(
  "lecture/createLecture",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const lecture = await api.post(`/lectures`, formData);

      return lecture.data.lecture;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Create Lecture!");
    }
  },
);

export const updateLecture = createAsyncThunk(
  "lecture/updateLecture",
  async (
    { _id, formData }: { _id: string; formData: FormData },
    { rejectWithValue },
  ) => {
    try {
      const lecture = await api.patch(`/lectures/${_id}`, formData);

      return lecture.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Update Lecture!");
    }
  },
);

export const deleteLecture = createAsyncThunk(
  "lecture/deleteLecture",
  async (_id: string, { rejectWithValue }) => {
    try {
      const lecture = await api.delete(`/lectures/${_id}`);

      return lecture.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Delete Lecture!");
    }
  },
);

const initialState: TInitialLecture = {
  lectures: null,
  status: "idle",
  error: null,
};

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder

      // Get Lectures
      .addCase(getLectures.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        getLectures.fulfilled,
        (state, action: PayloadAction<TLectureSchemaType[]>) => {
          state.status = "fulfilled";
          state.lectures = action.payload;
          state.error = null;
        },
      )
      .addCase(getLectures.rejected, (state, action) => {
        state.status = "fulfilled";
        state.lectures = null;
        state.error = action.payload as string;
      })

      // Create Lecture
      .addCase(createLecture.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createLecture.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Lecture Created Successfully!");
        state.error = null;
      })
      .addCase(createLecture.rejected, (state, action) => {
        state.status = "failed";
        state.lectures = null;
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })

      // Update Lecture
      .addCase(updateLecture.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(updateLecture.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Lecture Updated Successfully!");
        state.error = null;
      })
      .addCase(updateLecture.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })

      // Delete Lecture
      .addCase(deleteLecture.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteLecture.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Lecture Deleted Successfully!");
        state.error = null;
      })
      .addCase(deleteLecture.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload as string);
        state.error = action.payload as string;
      }),
});

export default lectureSlice.reducer;
