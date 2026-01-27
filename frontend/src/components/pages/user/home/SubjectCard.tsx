import { Link } from "react-router";
import type { TSubjectSchemaType } from "../../../../types/schema/SubjectSchemaType";

const SubjectCard = ({
  _id,
  subjectName,
  subjectCode,
  subjectDesc,
  subjectHours,
  doctorsNames,
  lectures,
  sections,
}: TSubjectSchemaType) => {
  return (
    <>
      <Link
        key={_id}
        to={`/subjects/${subjectCode}`}
        className="rounded-2xl bg-white p-5 shadow-md hover:shadow-lg transition"
      >
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600 font-medium">
            {subjectCode}
          </span>

          <div className="flex items-center gap-1 text-xs text-gray-400">
            <i className="fa-regular fa-clock"></i>
            {subjectHours} hours
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-lg font-semibold text-gray-900 leading-snug">
          {subjectName}
        </h2>

        {/* Description */}
        <h2 className="text-sm text-gray-700 leading-snug">{subjectDesc}</h2>

        {/* Subtitle */}
        <div className="flex items-baseline gap-1 mt-2 capitalize">
          <i className="fa-solid fa-chalkboard-user text-sm text-purple-500"></i>
          <p className="mt-1 text-sm text-gray-500">
            {doctorsNames?.map(
              (m, i) => "Dr." + m + (i != doctorsNames.length - 1 ? ", " : ""),
            )}
          </p>
        </div>

        {/* Info row */}
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-400 font-medium">
            <i className="fa-solid fa-graduation-cap"></i>
            <p> lectures: {lectures?.length}</p>
          </div>
          <div className="flex items-center gap-1 text-gray-400 font-medium">
            <i className="fa-solid fa-file-zipper"></i>
            <p>sections: {sections?.length}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SubjectCard;
