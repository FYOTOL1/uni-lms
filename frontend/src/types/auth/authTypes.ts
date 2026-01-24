import type { TPermissionsActionsSchemaType } from "../schema/UserSchemaType";

export type TPermissions = {
  users: TPermissionsActionsSchemaType;
  subjects: TPermissionsActionsSchemaType;
  calendar: TPermissionsActionsSchemaType;
  assignments: TPermissionsActionsSchemaType;
  lectures: TPermissionsActionsSchemaType;
  sections: TPermissionsActionsSchemaType;
};

export type TMeRequest = {
  _id: string;
  userName: string;
  role: "admin" | "subadmin" | "student";
  userGroup: string;
  permissions: TPermissions;
};
