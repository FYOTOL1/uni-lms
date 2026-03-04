import { Link, useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { useEffect, useState } from "react";
import { getOneSubject } from "../../../../store/slices/SubjectSlice";
import type { TLectureSchemaType } from "../../../../types/schema/LectureSchemaType";
import type { TSectionSchemaType } from "../../../../types/schema/SectionSchemaType";
import AssignmentCard from "./AssignmentCard";

const Subject = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const subjectCode = useParams().subjectCode;

  const { subject, status } = useAppSelector((state) => state.subject);

  const [selectedToRender, setSelectedToRender] = useState<
    "lectures" | "sections"
  >("lectures");

  useEffect(() => {
    if (subjectCode) dispatch(getOneSubject(subjectCode));
  }, [dispatch, subjectCode]);

  if (status == "pending") return <div>Loading...</div>;

  if (!subject || status == "failed") {
    navigate("/");
    return;
  }

  const selectedRender = () => {
    if (selectedToRender != "sections" && subject.lectures?.length) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subject.lectures?.map((e: TLectureSchemaType) => (
            <div className="flex flex-col gap-4 outline outline-gray-300 shadow-sm p-2 rounded text-black">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg capitalize">
                  <div className="flex items-center justify-center text-white bg-purple-500 size-8 rounded">
                    <i className="fa-solid fa-graduation-cap" />
                  </div>
                  <p>{e.lectureName}</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-200 rounded-full text-sm">
                  <p>{new Date(e.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="text-wrap">
                <p>{e.lectureDesc}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to={e.attachmentUrl}
                  className="px-3 py-1 rounded text-gray-800 text-center outline outline-gray-400 cursor-pointer underline-offset-2 transition-all hover:text-gray-500"
                >
                  Visit
                </Link>
                <Link
                  to={e.attachmentUrl.replace(
                    "/upload/",
                    "/upload/fl_attachment/",
                  )}
                  className="px-3 py-1 rounded text-white text-center bg-purple-500 outline outline-gray-400 cursor-pointer underline-offset-2 transition-all hover:text-purple-300"
                >
                  Download
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (selectedToRender == "sections" && subject.sections?.length) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subject.sections?.map((e: TSectionSchemaType) => (
            <div className="flex flex-col gap-4 outline outline-gray-300 shadow-sm p-2 rounded text-black">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg capitalize">
                  <div className="flex items-center justify-center text-white bg-blue-500 size-8 rounded">
                    <i className="fa-solid fa-file-zipper" />
                  </div>
                  <p>{e.sectionName}</p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-200 rounded-full text-sm">
                  <p>{new Date(e.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="text-wrap">
                <p>{e.sectionDesc}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Link
                  to={e.attachmentUrl}
                  className="px-3 py-1 rounded text-gray-800 text-center outline outline-gray-400 cursor-pointer underline-offset-2 transition-all hover:text-gray-400"
                >
                  Visit
                </Link>
                <Link
                  to={e.attachmentUrl.replace(
                    "/upload/",
                    "/upload/fl_attachment/",
                  )}
                  className="px-3 py-1 rounded text-white text-center bg-blue-500 outline outline-gray-400 cursor-pointer underline-offset-2 transition-all hover:text-blue-200"
                >
                  Download
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="mx-auto text-2xl py-4 text-gra-800 underline underline-offset-4">
          <p>Empty</p>
        </div>
      );
    }
  };

  return (
    <>
      <div key={subject._id} className="flex flex-col gap-4 h-full w-full">
        {/* Subject Details */}
        <div>
          <div className="relative flex flex-col items-center justify-center gap-2 px-2 text-gray-100 bg-purple-600 w-full py-10">
            <Link
              className="absolute top-3 left-3 flex items-baseline transition-all gap-1 hover:gap-2"
              to={"/"}
            >
              <i className="fa-solid fa-arrow-left" />
              <p>Back</p>
            </Link>

            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold capitalize">
              {subject?.subjectName}
            </h1>
            <div className="flex items-center flex-col md:flex-row gap-1.5 capitalize">
              {subject?.doctorsNames &&
                subject?.doctorsNames.map((e) => (
                  <div className="flex items-center gap-1.5 px-4 py-1 bg-purple-700 rounded-full">
                    <i className="fa-solid fa-chalkboard-user" />
                    <p>Dr.{e}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Subject Details */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 place-items-center gap-3 px-2 py-2 bg-purple-500 text-white shadow-sm outline-gray-300 w-full">
              <div className="flex items-baseline gap-1">
                <i className="fa-regular fa-clock" />
                <p>Doctors: {subject?.doctorsNames?.length}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <i className="fa-regular fa-clock" />
                <p>Hours: {subject?.subjectHours}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <i className="fa-solid fa-graduation-cap" />
                <p>Lectures: {subject?.lectures?.length}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <i className="fa-solid fa-file-zipper" />
                <p>Sections: {subject?.sections?.length}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <i className="fa-solid fa-list-check" />
                <p>Assignments: {subject?.assignments?.length}</p>
              </div>
              <Link
                to={(subject.book as string).replace(
                  "/upload/",
                  "/upload/fl_attachment/",
                )}
                className="flex items-baseline gap-1 underline"
              >
                <i className="fa-solid fa-download" />
                <p>Book</p>
              </Link>
            </div>

            <hr className="text-purple-400" />

            <div className="capitalize text-center text-wrap w-full px-2 py-2 text-white bg-purple-500">
              {subject?.subjectDesc}
            </div>
          </div>
        </div>

        {/* Lectures & Sections Links*/}
        <div className="px-2">
          <div className="rounded-md shadow-sm bg-white outline outline-gray-200 p-4">
            <header className="w-full">
              <ul className="flex items-center gap-3">
                <li
                  onClick={() => setSelectedToRender("lectures")}
                  className={`font-semibold rounded px-3 py-1  ${selectedToRender != "lectures" ? "bg-white" : "bg-purple-200"} outline outline-gray-200 cursor-pointer`}
                >
                  Lectures
                </li>
                <li
                  onClick={() => setSelectedToRender("sections")}
                  className={`font-semibold rounded px-3 py-1  ${selectedToRender != "sections" ? "bg-white" : "bg-blue-200"} outline outline-gray-200 cursor-pointer`}
                >
                  Sections
                </li>
              </ul>
            </header>
            <br />
            <div className="flex flex-col gap-3 w-full">
              <h1 className="text-2xl font-semibold text-gray-800">
                {selectedToRender == "lectures" ? (
                  <div className="flex items-center gap-1 text-purple-700">
                    <i className="fa-solid fa-graduation-cap text-xl" />
                    <h1>Lectures:</h1>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-blue-700">
                    <i className="fa-solid fa-file-zipper text-xl" />
                    <h1>Sections:</h1>
                  </div>
                )}
              </h1>
              {selectedRender()}
            </div>
          </div>
        </div>

        {/* Assignments */}
        <div className="mx-2 p-4 rounded-md shadow-sm bg-white outline outline-gray-200">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-list-check text-xl text-purple-500" />
            <h1 className="text-2xl font-semibold text-gray-800">
              Assignments
            </h1>
          </div>
          {subject?.assignments?.length ? (
            <div className="grid md:grid-cols-2 gap-2 w-full mt-2">
              {subject.assignments?.map((e) => (
                <AssignmentCard e={e} />
              ))}
            </div>
          ) : (
            <div className="text-center text-xl py-6 text-gray-600 underline underline-offset-4">
              <p>No Assignments Yet!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Subject;
