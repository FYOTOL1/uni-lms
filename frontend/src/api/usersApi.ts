import { api } from "../main";
import type { TUserSchema } from "../types/schema/UserSchemaType";

const getAllUsersFn = async (): Promise<{ users: TUserSchema[] }> => {
  const getAllStudentsReq = await api.get("/users");
  return getAllStudentsReq.data;
};

export { getAllUsersFn };
