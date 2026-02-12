/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { api } from "../../main";
import toast from "react-hot-toast";
import type { TSectionSchemaType } from "../../types/schema/SectionSchemaType";

type TInitialSection = {
  sections: TSectionSchemaType[] | null;
  status: "idle" | "pending" | "fulfilled" | "failed";
  error: string | null;
};

export const getSections = createAsyncThunk(
  "section/getSections",
  async (_, { rejectWithValue }) => {
    try {
      const Sections = await api.get("/sections");
      return Sections.data.sections;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Get Sections!");
    }
  },
);

export const createSection = createAsyncThunk(
  "section/createSection",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const Section = await api.post(`/sections`, formData);

      return Section.data.section;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Create Section!");
    }
  },
);

export const updateSection = createAsyncThunk(
  "section/updateSection",
  async (
    { _id, formData }: { _id: string; formData: FormData },
    { rejectWithValue },
  ) => {
    try {
      const Section = await api.patch(`/sections/${_id}`, formData);

      return Section.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Update Section!");
    }
  },
);

export const deleteSection = createAsyncThunk(
  "section/deleteSection",
  async (_id: string, { rejectWithValue }) => {
    try {
      const Section = await api.delete(`/sections/${_id}`);

      return Section.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed To Delete Section!");
    }
  },
);

const initialState: TInitialSection = {
  sections: null,
  status: "idle",
  error: null,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder

      // Get Sections
      .addCase(getSections.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        getSections.fulfilled,
        (state, action: PayloadAction<TSectionSchemaType[]>) => {
          state.status = "fulfilled";
          state.sections = action.payload;
          state.error = null;
        },
      )
      .addCase(getSections.rejected, (state, action) => {
        state.status = "fulfilled";
        state.sections = null;
        state.error = action.payload as string;
      })

      // Create Section
      .addCase(createSection.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createSection.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Section Created Successfully!");
        state.error = null;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.status = "failed";
        state.sections = null;
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })

      // Update Section
      .addCase(updateSection.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(updateSection.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Section Updated Successfully!");
        state.error = null;
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload as string);
        state.error = action.payload as string;
      })

      // Delete Section
      .addCase(deleteSection.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state) => {
        state.status = "fulfilled";
        toast.success("Section Deleted Successfully!");
        state.error = null;
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.status = "failed";
        toast.error(action.payload as string);
        state.error = action.payload as string;
      }),
});

export default sectionSlice.reducer;
