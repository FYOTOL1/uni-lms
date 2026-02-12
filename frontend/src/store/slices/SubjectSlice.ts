/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { TSubjectSchemaType } from "../../types/schema/SubjectSchemaType";
import { api } from "../../main";
import toast from "react-hot-toast";

type TInitialSubject = {
  subjects: TSubjectSchemaType[] | null;
  subject: TSubjectSchemaType | null;
  status: "idle" | "pending" | "fulfilled" | "failed";
  error: string | null;
};

export const getSubjects = createAsyncThunk(
  "subject/getSubjects",
  async (_, { rejectWithValue }) => {
    try {
      const getSubjects = await api.get("/subjects");
      return getSubjects.data.subjects;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Get Subjects!");
    }
  },
);

export const getOneSubject = createAsyncThunk(
  "subject/getOneSubject",
  async (subjectCode: string, { rejectWithValue }) => {
    try {
      const getSubject = await api.post(`/subjects/${subjectCode}`);
      return getSubject.data.subject;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Get Subject!");
    }
  },
);

export const createSubject = createAsyncThunk(
  "subject/createSubject",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const subject = await api.post(`/subjects`, formData);

      return subject.data.subject;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Create Subject!");
    }
  },
);

export const updateSubject = createAsyncThunk(
  "subject/updateSubject",
  async (
    { _id, formData }: { _id: string; formData: FormData },
    { rejectWithValue },
  ) => {
    try {
      const subject = await api.patch(`/subjects/${_id}`, formData);

      return subject.data.subject;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Update Subject!");
    }
  },
);

export const deleteSubject = createAsyncThunk(
  "subject/deleteSubject",
  async (_id: string, { rejectWithValue }) => {
    try {
      const subject = await api.delete(`/subjects/${_id}`);

      return subject.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Delete Subject!");
    }
  },
);

const initialState: TInitialSubject = {
  subjects: null,
  subject: null,
  status: "idle",
  error: null,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // Get Subjects
      .addCase(getSubjects.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        getSubjects.fulfilled,
        (state, action: PayloadAction<TSubjectSchemaType[]>) => {
          state.status = "fulfilled";
          state.subjects = action.payload;
          state.error = null;
        },
      )
      .addCase(getSubjects.rejected, (state, action) => {
        state.status = "fulfilled";
        state.subjects = null;
        state.error = action.payload as string;
      })
      // Get Subject
      .addCase(getOneSubject.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        getOneSubject.fulfilled,
        (state, action: PayloadAction<TSubjectSchemaType>) => {
          state.status = "fulfilled";
          state.subject = action.payload;
          state.error = null;
        },
      )
      .addCase(getOneSubject.rejected, (state, action) => {
        state.status = "failed";
        state.subject = null;
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })
      // Create Subject
      .addCase(createSubject.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        createSubject.fulfilled,
        (state, action: PayloadAction<TSubjectSchemaType>) => {
          state.status = "fulfilled";
          toast.success("Subject Created Successfully!");
          state.subject = action.payload;
          state.error = null;
        },
      )
      .addCase(createSubject.rejected, (state, action) => {
        state.status = "failed";
        state.subject = null;
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })
      // Update Subject
      .addCase(updateSubject.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        updateSubject.fulfilled,
        (state, action: PayloadAction<TSubjectSchemaType>) => {
          state.status = "fulfilled";
          toast.success("Subject Updated Successfully!");
          state.subject = action.payload;
          state.error = null;
        },
      )
      .addCase(updateSubject.rejected, (state, action) => {
        state.status = "failed";
        state.subject = null;
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })
      // Delete Subject
      .addCase(deleteSubject.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        deleteSubject.fulfilled,
        (state, action: PayloadAction<TSubjectSchemaType>) => {
          state.status = "fulfilled";
          toast.success("Subject Deleted Successfully!");
          state.subject = action.payload;
          state.error = null;
        },
      )
      .addCase(deleteSubject.rejected, (state, action) => {
        state.status = "failed";
        state.subject = null;
        toast.error(action.payload as string);
        state.error = action.payload as string;
      }),
});

export default subjectSlice.reducer;
