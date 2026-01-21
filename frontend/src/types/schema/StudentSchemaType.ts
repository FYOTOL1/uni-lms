export interface IUserSchema {
  _id: string;
  userName: string;
  userCode: number;
  userGroup: string;
  userSection: number;
  email: string;
  password: string;
  phoneNumber: number;
  role: "student" | "subadmin" | "admin";
  createdAt: string;
  updatedAt: string;
}
