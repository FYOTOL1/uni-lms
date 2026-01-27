import { TPermissionsActionsSchemaType } from "./UserSchemaTypes";

export type TPermissions = {
  users: TPermissionsActionsSchemaType;
  subjects: TPermissionsActionsSchemaType;
  calendars: TPermissionsActionsSchemaType;
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
