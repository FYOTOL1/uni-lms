import { createSlice } from "@reduxjs/toolkit";
import type { IStudentSchema } from "../../types/schema/StudentSchemaType";

const initialState: IStudentSchema | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
