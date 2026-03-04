import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFormik } from "formik";
import InputField from "../../user/auth/InputField";
import FromSelect from "../../user/shared/FormSelect";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import {
  createLecture,
  getLectures,
} from "../../../../store/slices/LectureSlice";
import CreateLectureValidation from "../../../../validation/CreateLectureValidation";
import { getSubjects } from "../../../../store/slices/SubjectSlice";

type Props = {
  isActiveCreateLecturePopup: boolean;
  setIsActiveCreateLecturePopup: Dispatch<SetStateAction<boolean>>;
};

type TCreateLectureTypes = {
  lectureName: string;
  lectureDesc: string;
  subject: string;
  file: null | File;
};

const CreateLecturePopup = ({ setIsActiveCreateLecturePopup }: Props) => {
  const dispatch = useAppDispatch();

  const { subjects, status } = useAppSelector((state) => state.subject);

  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const initialValues: TCreateLectureTypes = {
    lectureName: "",
    lectureDesc: "",
    subject: "",
    file: null,
  };

  const { values, handleSubmit, handleBlur, setFieldValue, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: CreateLectureValidation,
      onSubmit: () => {
        const formData = new FormData();

        formData.append("lectureName", values.lectureName);
        formData.append("lectureDesc", values.lectureDesc);
        if (subjects)
          formData.append(
            "subject",
            subjects.filter((f) => f.subjectCode == values.subject)[0]._id!,
          );
        formData.append("file", values.file!);

        if (status !== "pending")
          dispatch(createLecture(formData)).then(() => {
            setIsActiveCreateLecturePopup(false);
            dispatch(getLectures());
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
            Create Lecture
          </h1>
          {/* Exit Button */}
          <button
            onClick={() => setIsActiveCreateLecturePopup(false)}
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
            inputPlaceholder="lecture1..."
            fieldName="Lecture name"
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
            inputPlaceholder="Talking About Programming Langs..."
            fieldName="Lecture description"
            inputName="lectureDesc"
            inputType="text"
            values={values}
            iconClass="fa-solid fa-pen"
          />

          {/* Lecture Subject*/}
          <FromSelect
            defaultValue="subject"
            choiceList={subjects ? subjects?.map((e) => e.subjectCode) : []}
            values={values}
            setFieldValue={setFieldValue}
          />

          {/* Book File */}
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
            disabled={status == "pending"}
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

export default CreateLecturePopup;
