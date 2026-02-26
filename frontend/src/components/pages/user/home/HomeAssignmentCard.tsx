/* eslint-disable react-hooks/purity */
import type { TAssignmentSchemaType } from "../../../../types/schema/AssignmentSchemaType";
import { Link } from "react-router";
import type { TSubjectSchemaType } from "../../../../types/schema/SubjectSchemaType";

const HomeAssignmentCard = ({
  assignment,
  subject,
}: {
  assignment: TAssignmentSchemaType;
  subject: TSubjectSchemaType;
}) => {
  const getLeftTime = (createdAt: Date | string, deadline: Date | string) => {
    const createdAtTime = new Date(createdAt).getTime();
    const deadlineTime = new Date(deadline).getTime();
    const now = Date.now();

    if (deadlineTime <= createdAtTime) return 0;

    const total = deadlineTime - createdAtTime;
    const passed = now - createdAtTime;

    const percentage = (passed / total) * 100;

    return percentage;
  };

  const getDaysLeft = (deadline: Date | string) => {
    const deadlineTime = new Date(deadline).getTime();
    const nowTime = Date.now();
    const diff = deadlineTime - nowTime;

    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div
      key={assignment._id}
      className="flex flex-col gap-3 p-4 rounded-md bg-white outline outline-gray-100 shadow-lg"
    >
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="flex items-center justify-center size-7 rounded bg-linear-60 from-purple-500 to-pink-500">
            <i className="fa-solid fa-pencil text-white" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <p className="px-3 py-1 rounded-full bg-gray-200 text-xs text-gary-700 font-semibold shadow-sm">
                {subject.subjectCode}
              </p>
              <p className="px-3 py-1 rounded-full bg-purple-200 text-purple-600 text-xs  font-semibold uppercase shadow-sm">
                {assignment.group}
              </p>
              <p className="px-3 py-1 rounded-full bg-blue-200 text-blue-600 text-xs font-semibold uppercase shadow-sm">
                {assignment.group}-{assignment.sectionNumber}
              </p>
            </div>
            <h1 className="text-[16px] text-gray-800 font-semibold capitalize text-wrap">
              {assignment.assignmentTitle}
            </h1>
          </div>
        </div>

        <Link
          className="text-purple-600 underline underline-offset-4"
          to={`/subjects/${subject.subjectCode}`}
        >
          {subject.subjectCode}
        </Link>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-800 text-wrap my-2">
        {assignment.assignmentDesc.slice(0, 64)}
      </p>

      {/* Dates */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-xs text-gary-700 font-semibold shadow-sm">
          <i className="fa-regular fa-calendar-plus text-gray-400 text-sm" />
          <p>
            Added:{" "}
            {`${new Date(assignment.createdAt).getDate()} ${new Date(assignment.createdAt).toLocaleString("en-US", { month: "short" })}`}
          </p>
        </div>

        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-xs text-gary-700 font-semibold shadow-sm">
          <i className="fa-regular fa-calendar text-gray-400 text-sm" />
          <p>
            Deadline:{" "}
            {`${new Date(assignment.deadline).getDate()} ${new Date(assignment.deadline).toLocaleString("en-US", { month: "short" })}`}
          </p>
        </div>
      </div>

      {/* Left Date */}
      <div className="relative w-full h-2 rounded-full bg-gray-100 outline outline-gray-200 overflow-hidden">
        <div
          style={{
            width: `${getLeftTime(assignment.createdAt, assignment.deadline)}%`,
          }}
          className={`absolute left-0 h-full bg-linear-90 from-pink-400 to-purple-600`}
        ></div>
      </div>

      <div className="flex items-center justify-between  gap-1 text-sm">
        <div className="flex items-center">
          <i className="fa-regular fa-calendar text-gray-400" />
          <p className="text-gray-600">
            Deadline:{" "}
            {getDaysLeft(assignment.deadline) === 1
              ? getDaysLeft(assignment.deadline) + " Day"
              : getDaysLeft(assignment.deadline) > 1
                ? getDaysLeft(assignment.deadline) + " Days"
                : "Time"}{" "}
            Left
          </p>
        </div>

        <p
          className={`flex items-center justify-center px-2 py-1 rounded-full ${getDaysLeft(assignment.deadline) === 0 ? "bg-gray-200 text-gray-600" : "bg-purple-500 text-white"} font-semibold`}
        >
          {getDaysLeft(assignment.deadline) === 0 ? "Not Active" : "Active"}
        </p>
      </div>
    </div>
  );
};

export default HomeAssignmentCard;
