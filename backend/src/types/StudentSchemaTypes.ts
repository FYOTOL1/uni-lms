export interface IStudentSchema {
  _id: string;
  studentName: string;
  studentCode: number;
  studentGroup: string;
  studentSection: number;
  email: string;
  password: string;
  phoneNumber: number;
  gender: "male" | "female";
  role: "student" | "subadmin" | "admin";
}
