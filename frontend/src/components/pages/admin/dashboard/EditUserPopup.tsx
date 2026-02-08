import { useState, type Dispatch, type SetStateAction } from "react";
import type { TUserSchemaType } from "../../../../types/schema/UserSchemaType";
import { useFormik } from "formik";
import InputField from "../../user/auth/InputField";
import FromSelect from "../../user/shared/FormSelect";
import PermissionsSelect from "./PermissionsSelect";
import { useAppDispatch } from "../../../../hooks/reduxHook";
import { updateUser } from "../../../../store/slices/UserSlice";
import editUserValidation from "../../../../validation/EditUserValidation";

type Props = {
  user: TUserSchemaType;
  setSelectedUserToEdit: Dispatch<
    SetStateAction<TUserSchemaType | null | undefined>
  >;
  refetch: () => void;
};

const EditUserPopup = ({ user, setSelectedUserToEdit, refetch }: Props) => {
  const dispatch = useAppDispatch();
  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const { values, handleSubmit, handleBlur, setFieldValue, touched, errors } =
    useFormik({
      initialValues: user,
      validationSchema: editUserValidation,
      onSubmit: () => {
        dispatch(updateUser(values)).then(() => {
          refetch();
          setSelectedUserToEdit(null);
        });
      },
    });

  const focusAndUnfocusStyle = (name: string) => {
    if (
      errors[name as keyof typeof errors] &&
      touched[name as keyof typeof touched]
    ) {
      return "outline outline-red-400";
    }
    if (focusedFieldName === name) {
      return "outline outline-purple-600";
    }
    if (touched[name as keyof typeof touched]) {
      return "outline outline-purple-400";
    }
    return "";
  };

  return (
    <>
      <div className="w-[550px] p-4 bg-white rounded-md shadow-sm outline outline-gray-200">
        <header className="flex items-center justify-between gap-4 w-full h-6">
          {/* User Name */}
          <h1 className="capitalize text-lg">{user?.userName}</h1>

          {/* Exit Button */}
          <button
            onClick={() => setSelectedUserToEdit(null)}
            className="text-red-400 size-7 rounded-md bg-red-200 cursor-pointer transition-all hover:bg-red-400"
          >
            <i className="fa-solid fa-x" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 w-full"
        >
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="like: Ahmed Abdo..."
            fieldName="student name"
            inputName="userName"
            values={values}
          />

          {/* Email */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="like: ahmed@gmail.com"
            fieldName="email"
            inputName="email"
            inputType="email"
            values={values}
            iconClass="fa-solid fa-envelope"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Phone Number  */}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: 01012345678"
              fieldName="phone number"
              inputName="phoneNumber"
              inputType="number"
              values={values}
              iconClass="fa-solid fa-phone"
            />

            {/* Student Code*/}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: 251234"
              fieldName="student code"
              inputName="userCode"
              inputType="number"
              values={values}
              iconClass="fa-solid fa-hashtag"
            />
          </div>

          {/* Student Group & Section & Submit Button */}
          <div className="grid grid-cols-1 items-end md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-2">
            {/* Student Group*/}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: a,b,c,d"
              fieldName="group"
              inputName="userGroup"
              inputType="text"
              values={values}
              iconClass="fa-solid fa-people-group"
            />

            {/* Student Section*/}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: 4"
              fieldName="section number"
              inputName="userSection"
              inputType="number"
              values={values}
              iconClass="fa-solid fa-user-group"
            />

            {/* Gender */}
            <FromSelect
              choiceList={["male", "female"]}
              setFieldValue={setFieldValue}
              values={values}
              defaultValue={"gender"}
            />

            {/* Year */}
            <FromSelect
              choiceList={["first", "second", "third", "fourth"]}
              setFieldValue={setFieldValue}
              values={values}
              defaultValue={"year"}
            />
          </div>

          {user?.role !== "student" && (
            <div className="flex flex-col gap-2">
              <PermissionsSelect
                name="users"
                setFieldValue={setFieldValue}
                permissions={values.permissions}
              />
              <PermissionsSelect
                name="subjects"
                setFieldValue={setFieldValue}
                permissions={values.permissions}
              />
              <PermissionsSelect
                name="calendars"
                setFieldValue={setFieldValue}
                permissions={values.permissions}
              />
              <PermissionsSelect
                name="lectures"
                setFieldValue={setFieldValue}
                permissions={values.permissions}
              />
              <PermissionsSelect
                name="sections"
                setFieldValue={setFieldValue}
                permissions={values.permissions}
              />
              <PermissionsSelect
                name="assignments"
                setFieldValue={setFieldValue}
                permissions={values.permissions}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-400 text-white rounded py-2 mt-2 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUserPopup;
