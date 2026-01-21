import axios from "axios";
import type { IUserSchema } from "../types/schema/StudentSchemaType";

const getAllStudentsFn = async (): Promise<IUserSchema[]> => {
  const getAllStudentsReq = await axios.get<IUserSchema[]>(
    `http://${import.meta.env.VITE_API_URI}/students`,
  );
  return getAllStudentsReq.data;
};

export { getAllStudentsFn };
