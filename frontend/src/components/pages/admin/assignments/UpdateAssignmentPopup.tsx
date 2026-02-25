/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFormik } from "formik";
import InputField from "../../user/auth/InputField";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import type { TAssignmentSchemaType } from "../../../../types/schema/AssignmentSchemaType";
import {
  getAssignments,
  updateAssignment,
} from "../../../../store/slices/AssignmentSlice";
import FromSelect from "../../user/shared/FormSelect";
import { getSubjects } from "../../../../store/slices/SubjectSlice";
import DatePicker from "react-datepicker";

type Props = {
  selectedAssignmentToUpdate: TAssignmentSchemaType;
  setSelectedAssignmentToUpdate: Dispatch<
    SetStateAction<TAssignmentSchemaType | null>
  >;
};

type TInitialValues = {
  assignmentTitle: string;
  assignmentDesc: string;
  subject: string;
  deadline: Date | null;
  section: 1 | 2 | 3 | 4 | 5 | 6 | null;
  group: "a" | "b" | "c" | "d" | null;
  file: null | File;
};

const UpdateAssignmentPopup = ({
  selectedAssignmentToUpdate,
  setSelectedAssignmentToUpdate,
}: Props) => {
  const dispatch = useAppDispatch();

  const { subjects } = useAppSelector((state) => state.subject);
  const { status } = useAppSelector((state) => state.assignment);

  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const initialValues: TInitialValues = {
    assignmentTitle: selectedAssignmentToUpdate.assignmentTitle,
    assignmentDesc: selectedAssignmentToUpdate.assignmentDesc,
    subject: selectedAssignmentToUpdate.subject?.subjectCode,
    deadline: new Date(selectedAssignmentToUpdate.deadline),
    group: selectedAssignmentToUpdate.group,
    section: selectedAssignmentToUpdate.sectionNumber,
    file: null,
  };

  const { values, handleSubmit, handleBlur, setFieldValue, touched, errors } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: () => {
        const formData = new FormData();

        formData.append("assignmentTitle", values.assignmentTitle);

        formData.append("assignmentDesc", values.assignmentDesc);

        if (values.deadline)
          formData.append("deadline", values.deadline.toISOString());

        if (subjects)
          formData.append(
            "subject",
            subjects.filter((f) => f.subjectCode == values.subject)[0]._id!,
          );

        formData.append("group", values.group!);

        if (values.section)
          formData.append("sectionNumber", values.section.toString());

        formData.append("file", values.file!);

        if (status !== "pending")
          dispatch(
            updateAssignment({ _id: selectedAssignmentToUpdate._id, formData }),
          ).then(() => {
            setSelectedAssignmentToUpdate(null);
            dispatch(getAssignments());
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

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  return (
    <>
      <div className="w-[550px] p-4 bg-white rounded-md shadow-sm outline outline-gray-200">
        <header className="flex items-center justify-between gap-4 w-full h-6">
          <h1 className="text-lg font-semibold text-gray-800">
            Create Assignment
          </h1>
          {/* Exit Button */}
          <button
            onClick={() => setSelectedAssignmentToUpdate(null)}
            className="text-red-400 size-7 rounded-md bg-red-200 cursor-pointer transition-all hover:bg-red-400"
          >
            <i className="fa-solid fa-x" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 w-full"
        >
          {/* Assignment Name */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="assignment1..."
            fieldName="Assignment name"
            inputName="assignmentTitle"
            values={values}
            iconClass="fa-solid fa-book"
          />

          {/* Assignment Description*/}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="Talking About Programming Langs..."
            fieldName="Assignment description"
            inputName="assignmentDesc"
            inputType="text"
            values={values}
            iconClass="fa-solid fa-pen"
          />

          {/* Assignment Subject*/}
          <FromSelect
            defaultValue="subject"
            choiceList={subjects ? subjects?.map((e) => e.subjectCode) : []}
            values={values}
            setFieldValue={setFieldValue}
          />

          <div className="grid grid-cols-3 gap-2">
            <DatePicker
              className=""
              selected={values.deadline}
              onChange={(date: any) => setFieldValue("deadline", date)}
              dateFormat="yyyy/MM/dd"
              customInput={
                <div className="w-full p-1.5 rounded outline outline-gray-400 text-center cursor-pointer">
                  {values.deadline?.toLocaleDateString() || "DeadLine"}
                </div>
              }
              placeholderText="DeadLine"
            />

            <FromSelect
              setFieldValue={setFieldValue}
              values={values}
              defaultValue={"section"}
              choiceList={[1, 2, 3, 4, 5, 6]}
            />
            <FromSelect
              setFieldValue={setFieldValue}
              values={values}
              defaultValue={"group"}
              choiceList={["a", "b", "c", "d"]}
            />
          </div>

          {/* File */}
          <div className="w-full">
            <label
              htmlFor="file"
              className="flex items-center justify-center gap-2 text-black outline outline-gray-600 rounded w-full py-2 transition-all cursor-pointer hover:bg-gray-100"
            >
              <i className="fa-solid fa-upload" />
              <p>
                {values.file instanceof File ? values.file.name : "Upload File"}
              </p>
            </label>
            <input
              onChange={(e) => setFieldValue("file", e.target.files?.[0])}
              className="hidden"
              id="file"
              type="file"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-400 text-white rounded py-2 mt-2 cursor-pointer"
          >
            {status == "pending" ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateAssignmentPopup;
