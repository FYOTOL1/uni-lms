import { useState, type Dispatch, type SetStateAction } from "react";
import { useFormik } from "formik";
import InputField from "../../user/auth/InputField";
import FromSelect from "../../user/shared/FormSelect";
import type { TSubjectSchemaType } from "../../../../types/schema/SubjectSchemaType";
import CreateSubjectValidation from "../../../../validation/CreateSubjectValidation";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import {
  createSubject,
  getSubjects,
} from "../../../../store/slices/SubjectSlice";

type Props = {
  isActiveCreateSubjectPopup: boolean;
  setIsActiveCreateSubjectPopup: Dispatch<SetStateAction<boolean>>;
};

const CreateSubjectPopup = ({ setIsActiveCreateSubjectPopup }: Props) => {
  const dispatch = useAppDispatch();

  const { status } = useAppSelector((state) => state.subject);

  const [focusedFieldName, setFocusedFieldName] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState<string>("");

  const initialValues: TSubjectSchemaType = {
    subjectName: "",
    subjectCode: "",
    subjectDesc: "",
    subjectHours: null,
    doctorsNames: [],
    book: "",
    year: null,
    semester: null,
  };

  const { values, handleSubmit, handleBlur, setFieldValue, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: CreateSubjectValidation,
      onSubmit: () => {
        const formData = new FormData();

        formData.append("subjectName", values.subjectName);
        formData.append("subjectCode", values.subjectCode);
        formData.append("subjectDesc", values.subjectDesc);
        formData.append("subjectHours", String(values.subjectHours));
        values.doctorsNames.forEach((name) => {
          formData.append("doctorsNames[]", name);
        });
        formData.append("book", values.book!);
        formData.append("year", values.year!);
        formData.append("semester", values.semester!);

        dispatch(createSubject(formData)).then(() => {
          setIsActiveCreateSubjectPopup(false);
          dispatch(getSubjects());
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
          <h1 className="text-lg font-semibold text-gray-800">
            Create Subject
          </h1>
          {/* Exit Button */}
          <button
            onClick={() => setIsActiveCreateSubjectPopup(false)}
            className="text-red-400 size-7 rounded-md bg-red-200 cursor-pointer transition-all hover:bg-red-400"
          >
            <i className="fa-solid fa-x" />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-4 w-full"
        >
          {/* Subject Name */}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="programming..."
            fieldName="subject name"
            inputName="subjectName"
            values={values}
            iconClass="fa-solid fa-book"
          />

          {/* Subject Description*/}
          <InputField
            focusAndUnfocusStyle={focusAndUnfocusStyle}
            setFocusedFieldName={setFocusedFieldName}
            setFieldValue={setFieldValue}
            handleBlur={handleBlur}
            inputPlaceholder="Programming Languages"
            fieldName="subject description"
            inputName="subjectDesc"
            inputType="text"
            values={values}
            iconClass="fa-solid fa-pen"
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 items-baseline-last gap-2">
            {/* Subject Code */}
            <InputField
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="prg"
              fieldName="subject Code"
              inputName="subjectCode"
              inputType="text"
              values={values}
              iconClass="fa-solid fa-hashtag"
            />

            {/* Subject Hours */}
            <InputField<TSubjectSchemaType>
              focusAndUnfocusStyle={focusAndUnfocusStyle}
              setFocusedFieldName={setFocusedFieldName}
              setFieldValue={setFieldValue}
              handleBlur={handleBlur}
              inputPlaceholder="like: 251234"
              fieldName="subject hours"
              inputName="subjectHours"
              inputType="number"
              values={values}
              iconClass="fa-regular fa-clock"
            />

            {/* Year */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="doctorName" className="text-sm text-[#333]">
                Year
              </label>
              <FromSelect
                choiceList={["first", "second", "third", "fourth"]}
                setFieldValue={setFieldValue}
                values={values}
                defaultValue={"year"}
              />
            </div>

            {/* Semester */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="doctorName" className="text-sm text-[#333]">
                Semester
              </label>
              <FromSelect
                choiceList={["1", "2"]}
                setFieldValue={setFieldValue}
                values={values}
                defaultValue={"semester"}
              />
            </div>
          </div>

          {/* Doctors Names */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline-last gap-2">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="doctorName" className="text-sm text-[#333]">
                  Doctor Name
                </label>
                <div
                  className={`relative py-2 h-9 transition-all outline outline-purple-300 ${focusAndUnfocusStyle(
                    "doctorsNames",
                  )} px-3 bg-zinc-50 ps-8 text-sm tracking-widest text-[#333] rounded`}
                >
                  <i
                    className={`absolute left-2 top-1/2 translate-y-[-45%] text-purple-500 text-sm fa-solid fa-chalkboard-user`}
                  />
                  <input
                    onChange={(e) => {
                      setDoctorName(String(e.target.value).toLowerCase());
                    }}
                    id="doctorName"
                    type="text"
                    value={doctorName}
                    className="w-full h-full border-none outline-none"
                    placeholder="like: mostafa adel"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (doctorName) {
                    setFieldValue("doctorsNames", [
                      ...values.doctorsNames,
                      doctorName,
                    ]);
                    setDoctorName("");
                  }
                }}
                className="px-4 py-1.5 outline outline-gray-300 rounded-md transition-all cursor-pointer hover:bg-gray-100"
              >
                Add
              </button>
            </div>

            <div
              className={`${values.doctorsNames ? "flex " : "hidden"} items-center flex-wrap gap-1.5`}
            >
              {values.doctorsNames.map((e) => (
                <button
                  onClick={() => {
                    setFieldValue(
                      "doctorsNames",
                      values.doctorsNames.filter((f) => f != e),
                    );
                  }}
                  className="flex items-center gap-1 py-1 px-2 capitalize text-sm text-black outline outline-gray-200 bg-zinc-50 rounded cursor-pointer"
                >
                  <i className="fa-solid fa-chalkboard-user" />
                  <p>Dr.{e}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Book File */}
          <div className="w-full">
            <label
              htmlFor="book"
              className="flex items-center justify-center gap-2 text-black outline outline-gray-600 rounded w-full py-2 transition-all cursor-pointer hover:bg-gray-100"
            >
              <i className="fa-solid fa-upload" />
              <p>
                {values.book instanceof File ? values.book.name : "Upload Book"}
              </p>
            </label>
            <input
              onChange={(e) => setFieldValue("book", e.target.files?.[0])}
              className="hidden"
              id="book"
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

export default CreateSubjectPopup;
