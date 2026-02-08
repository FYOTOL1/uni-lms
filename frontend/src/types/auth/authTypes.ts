import type { TPermissions } from "../schema/UserSchemaType";

export type TMeRequest = {
  _id: string;
  userName: string;
  userGroup: string;
  role: "admin" | "subadmin" | "student";
  year: "first" | "second" | "third" | "fourth";
  permissions: TPermissions;
};
