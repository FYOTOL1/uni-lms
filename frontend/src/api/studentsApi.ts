import axios from "axios";
import type { IStudentSchema } from "../types/schema/StudentSchemaType";

const getAllStudentsFn = async (): Promise<IStudentSchema[]> => {
  const getAllStudentsReq = await axios.get<IStudentSchema[]>(
    `http://${import.meta.env.VITE_API_URI}/students`
  );
  return getAllStudentsReq.data;
};

export { getAllStudentsFn };
