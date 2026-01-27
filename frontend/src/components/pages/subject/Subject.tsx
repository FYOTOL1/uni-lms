import { Link } from "react-router";
import type { TSubjectSchemaType } from "../../../types/schema/SubjectSchemaType";

const subject = ({ subject }: { subject: TSubjectSchemaType }) => {
  return (
    <>
      <div className="flex flex-col gap-4 h-full w-full">
        <div>
          <div className="flex flex-col items-center justify-center gap-2 px-2 text-gray-100 bg-purple-600 w-full h-96">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-semibold capitalize">
              {subject?.subjectName}
            </h1>
            <div className="flex items-center gap-1.5 px-4 py-1 bg-purple-700 rounded-full">
              <i className="fa-solid fa-chalkboard-user" />
              <p>Dr.{subject?.doctorName}</p>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center gap-3 px-2 py-2 bg-purple-500 text-white shadow-sm outline-gray-300 w-full">
              <div className="flex items-baseline gap-0.5">
                <i className="fa-solid fa-hashtag" />
                <p className="capitalize">{subject?.subjectCode}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <i className="fa-solid fa-chalkboard-user" />
                <p>Dr. {subject?.doctorName}</p>
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
                <i className="fa-solid fa-file-zipper" />
                <p>Assignments: {subject?.assignments?.length}</p>
              </div>
            </div>

            <hr className="text-purple-400" />

            <div className="capitalize text-center text-wrap w-full px-2 py-2 text-white bg-purple-500">
              {subject?.subjectDesc}
            </div>
          </div>
        </div>
        {/* Lectures & Sections Links*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-2">
          {/* Lectures */}

          <div className=" bg-zinc-100 outline-2 outline-zinc-200 rounded shadow-sm p-4">
            <div className="flex flex-col gap-3 w-full">
              <h1 className="text-2xl font-semibold text-gray-800">
                Lectures:
              </h1>
              <div className="flex items-center justify-between bg-purple-500 py-1 px-2 rounded text-white">
                <p>Lecture-1</p>
                <Link
                  to={
                    "https://i.pinimg.com/236x/d9/75/70/d9757033806a5464b0baa40c81eb52da.jpg"
                  }
                  download
                  className="px-3 py-1 rounded text-gray-100 cursor-pointer underline underline-offset-2 transition-all hover:text-gray-200"
                >
                  Material
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-zinc-100 outline-2 outline-zinc-200 rounded shadow-sm p-4"></div>
        </div>
      </div>
    </>
  );
};

export default subject;
