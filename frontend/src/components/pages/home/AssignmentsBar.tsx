import { Link } from "react-router";
import type { AssignmentSchemaType } from "../../../types/schema/AssignmentSchemaType";

const AssignmentsBar = ({
  assignments,
}: {
  assignments: AssignmentSchemaType[];
}) => {
  const getDeadLine = (assignmentCreatedDate: Date) => {
    const leftDays = assignmentCreatedDate.getDay() - new Date().getDay();
    if (leftDays >= 2) {
      return leftDays.toString() + "d";
    } else if (leftDays == 1) {
      return "tomorrow";
    } else if (leftDays >= 0 && leftDays < 1) {
      return "today";
    } else {
      return "done";
    }
  };

  return (
    <>
        <div className="bg-white outline outline-purple-100 p-3 py-3 rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="text-[14px] text-purple-600 fa-solid fa-list-check"></i>
              <h1 className="font-semibold text-[#333]">Assignments</h1>
            </div>

            <Link
              className="text-sm text-purple-500 transition-all hover:text-purple-700"
              to={"/assignments"}
            >
              All...
            </Link>
          </div>

          <hr className="my-3 text-gray-300" />

          <div className="flex flex-col gap-3">
            {assignments.slice(0, 6).map((e) => (
              <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-purple-50 to-white p-4 border border-purple-100 shadow-sm hover:shadow-lg transition-all">
                {/* Accent bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-purple-500"></div>

                {/* Subject */}
                <Link
                  to={`/subjects/${e.subjectName}`}
                  className="text-xs font-medium uppercase tracking-wide text-purple-600 hover:underline"
                >
                  {e.subjectName}
                </Link>

                {/* Title */}
                <h2 className="mt-1 text-base font-semibold text-gray-800">
                  {e.assignmentTitle}
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {e.assignmentDesc}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  {/* Deadline */}
                  <div className="flex items-baseline gap-1 text-xs text-gray-400">
                    <i className="fa-regular fa-clock"></i>
                    <span>{getDeadLine(e.deadline)}</span>
                  </div>

                  {/* Action */}
                  <Link
                    to={`/assignments/${e._id}`}
                    className="text-sm font-medium text-purple-600 hover:text-purple-700 transition"
                  >
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default AssignmentsBar;
