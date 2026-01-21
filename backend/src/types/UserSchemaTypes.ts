export interface IUserSchema {
  _id: string;
  userName: string;
  userCode: number;
  userGroup: string;
  userSection: number;
  email: string;
  password: string;
  phoneNumber: number;
  gender: "male" | "female";
  role: "student" | "subadmin" | "admin";
}
