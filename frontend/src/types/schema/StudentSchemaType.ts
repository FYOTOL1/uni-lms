export interface IStudentSchema {
  _id: string;
  studentName: string;
  studentCode: number;
  studentGroup: string;
  studentSection: number;
  email: string;
  password: string;
  phoneNumber: number;
  role: "student" | "subadmin" | "admin";
  createdAt: string;
  updatedAt: string;
}
