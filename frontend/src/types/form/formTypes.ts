export type TInitialInputsAuthFormValues = {
  userName?: string;
  userCode?: number | null;
  userGroup?: string;
  userSection?: number | null;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: number | null;
  gender?: "male" | "female" | null;
  year?: "first" | "second" | "third" | "fourth";
};

export type TInitialInputsCalendarFilterForm = {
  dayName: string;
};
