export type TPermissions = {
  users: TPermissionsActionsSchemaType;
  subjects: TPermissionsActionsSchemaType;
  calendars: TPermissionsActionsSchemaType;
  assignments: TPermissionsActionsSchemaType;
  lectures: TPermissionsActionsSchemaType;
  sections: TPermissionsActionsSchemaType;
};

export type TPermissionsActionsSchemaType = {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

export type TUserSchemaType = {
  _id: string;
  userName: string;
  userCode: number;
  userGroup: string;
  userSection: number;
  email: string;
  password: string;
  phoneNumber: number;
  gender: "male" | "female";
  year: "first" | "second" | "third" | "fourth";
  role: "student" | "subadmin" | "admin";
  permissions: {
    users: TPermissionsActionsSchemaType;
    subjects: TPermissionsActionsSchemaType;
    calendars: TPermissionsActionsSchemaType;
    assignments: TPermissionsActionsSchemaType;
    lectures: TPermissionsActionsSchemaType;
    sections: TPermissionsActionsSchemaType;
  };
};
