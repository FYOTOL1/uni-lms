import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useFormik } from "formik";
import InputField from "../../user/auth/InputField";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import type { TSectionSchemaType } from "../../../../types/schema/SectionSchemaType";
import {
  getSections,
  updateSection,
} from "../../../../store/slices/SectionSlice";
import FromSelect from "../../user/shared/FormSelect";
import { getSubjects } from "../../../../store/slices/SubjectSlice";

type Props = {
  selectedSectionToUpdate: TSectionSchemaType;
  setSelectedSectionToUpdate: Dispatch<
    SetStateAction<TSectionSchemaType | null>
  >;
};

type TInitialValues = {
  sectionName: string;
  sectionDesc: string;
  subject: string;
  file: null | File;
};

const UpdateSectionPopup = ({
  selectedSectionToUpdate,
  setSelectedSectionToUpdate,
}: Props) => {
  const dispatch = useAppDispatch();

  const { subjects } = useAppSelector((state) => state.subject);

  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);

  const initialValues: TInitialValues = {
    sectionName: selectedSectionToUpdate.sectionName,
    sectionDesc: selectedSectionToUpdate.sectionDesc,
    subject: selectedSectionToUpdate.subject?.subjectCode || "",
    file: null,
  };

  const { values, handleSubmit, handleBlur, setFieldValue, touched, errors } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: () => {
        const formData = new FormData();

        if (values.sectionName)
          formData.append("sectionName", values.sectionName);

        if (values.sectionDesc)
          formData.append("sectionDesc", values.sectionDesc);

        if (values.subject && subjects)
          formData.append(
            "subject",
            subjects.filter((f) => f.subjectCode == values.subject)[0]._id!,
          );

        if (values.file) formData.append("file", values.file);

        dispatch(
          updateSection({ _id: selectedSectionToUpdate._id!, formData }),
        ).then(() => {
          dispatch(getSections());
          setSelectedSectionToUpdate(null);
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
            Update Section
          </h1>
          {/* Exit Button */}
          <button
            onClick={() => setSelectedSectionToUpdate(null)}
            className="text-red-400 size-7 rounded-md bg-red-200 cursor-pointer transition-all hover:bg-red-400"
          >
            <i className="fa-solid fa-x" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 w-full"
        >
          {/* Section Name */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="programming..."
            fieldName="section name"
            inputName="sectionName"
            values={values}
            iconClass="fa-solid fa-book"
          />

          {/* Section Description*/}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="Programming Languages"
            fieldName="section description"
            inputName="sectionDesc"
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

export default UpdateSectionPopup;
