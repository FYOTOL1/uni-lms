import { createSlice } from "@reduxjs/toolkit";
import type { IUserSchema } from "../../types/schema/StudentSchemaType";

const initialState: IUserSchema | null = null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
