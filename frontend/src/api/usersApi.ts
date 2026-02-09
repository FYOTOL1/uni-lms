import { api } from "../main";
import type { TUserSchemaType } from "../types/schema/UserSchemaType";

const getAllUsersFn = async (): Promise<{ users: TUserSchemaType[] }> => {
  const getAllStudentsReq = await api.get("/users");
  return getAllStudentsReq.data;
};

export { getAllUsersFn };
