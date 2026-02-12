import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFormik } from "formik";
import InputField from "../../user/auth/InputField";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import type { TLectureSchemaType } from "../../../../types/schema/LectureSchemaType";
import {
  getLectures,
  updateLecture,
} from "../../../../store/slices/LectureSlice";
import FromSelect from "../../user/shared/FormSelect";
import { getSubjects } from "../../../../store/slices/SubjectSlice";

type Props = {
  selectedLectureToUpdate: TLectureSchemaType;
  setSelectedLectureToUpdate: Dispatch<
    SetStateAction<TLectureSchemaType | null>
  >;
};

type TInitialValues = {
  lectureName: string;
  lectureDesc: string;
  subject: string;
  file: null | File;
};

const UpdateLecturePopup = ({
  selectedLectureToUpdate,
  setSelectedLectureToUpdate,
}: Props) => {
  const dispatch = useAppDispatch();

  const { subjects } = useAppSelector((state) => state.subject);

  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const initialValues: TInitialValues = {
    lectureName: selectedLectureToUpdate.lectureName,
    lectureDesc: selectedLectureToUpdate.lectureDesc,
    subject: selectedLectureToUpdate.subject?.subjectCode || "",
    file: null,
  };

  const { values, handleSubmit, handleBlur, setFieldValue, touched, errors } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: () => {
        const formData = new FormData();

        if (values.lectureName)
          formData.append("lectureName", values.lectureName);

        if (values.lectureDesc)
          formData.append("lectureDesc", values.lectureDesc);

        if (values.subject && subjects)
          formData.append(
            "subject",
            subjects.filter((f) => f.subjectCode == values.subject)[0]._id!,
          );

        if (values.file) formData.append("file", values.file);

        dispatch(
          updateLecture({ _id: selectedLectureToUpdate._id!, formData }),
        ).then(() => {
          dispatch(getLectures());
          setSelectedLectureToUpdate(null);
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
            Update Lecture
          </h1>
          {/* Exit Button */}
          <button
            onClick={() => setSelectedLectureToUpdate(null)}
            className="text-red-400 size-7 rounded-md bg-red-200 cursor-pointer transition-all hover:bg-red-400"
          >
            <i className="fa-solid fa-x" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 w-full"
        >
          {/* Lecture Name */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="programming..."
            fieldName="lecture name"
            inputName="lectureName"
            values={values}
            iconClass="fa-solid fa-book"
          />

          {/* Lecture Description*/}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="Programming Languages"
            fieldName="lecture description"
            inputName="lectureDesc"
            inputType="text"
            values={values}
            iconClass="fa-solid fa-pen"
          />

          {/* Subject Code*/}
          <FromSelect
            defaultValue="subject"
            choiceList={subjects ? subjects?.map((e) => e.subjectCode) : []}
            values={values}
            setFieldValue={setFieldValue}
          />

          {/* Book File */}
          <div className="w-full">
            <label
              htmlFor="book"
              className="flex items-center justify-center gap-2 text-black outline outline-gray-600 rounded w-full py-2 transition-all cursor-pointer hover:bg-gray-100"
            >
              <i className="fa-solid fa-upload" />
              <p>
                {values.file instanceof File ? values.file.name : "Upload file"}
              </p>
            </label>
            <input
              onChange={(e) => setFieldValue("file", e.target.files?.[0])}
              className="hidden"
              id="book"
              type="file"
            />
          </div>

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

export default UpdateLecturePopup;
