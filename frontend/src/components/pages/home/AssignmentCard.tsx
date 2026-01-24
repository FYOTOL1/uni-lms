import { Link } from "react-router";
import type { AssignmentSchemaType } from "../../../types/schema/AssignmentSchemaType";

const AssignmentCard = ({
  assignment,
}: {
  assignment: AssignmentSchemaType;
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
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br p-4 border border-purple-100 shadow-sm hover:shadow-lg transition-all">
        {/* Accent bar */}
        <div className="absolute left-0 top-0 h-full w-1 bg-purple-500"></div>

        {/* Subject */}
        <Link
          to={`/subjects/${assignment.subjectName}`}
          className="text-xs font-medium uppercase tracking-wide text-purple-600 hover:underline"
        >
          {assignment.subjectName}
        </Link>

        {/* Title */}
        <h2 className="mt-1 text-base font-semibold text-gray-800">
          {assignment.assignmentTitle}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-3">
          {assignment.assignmentDesc}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          {/* Deadline */}
          <div className="flex items-baseline gap-1 text-xs text-gray-400">
            <i className="fa-regular fa-clock"></i>
            <span>{getDeadLine(assignment.deadline)}</span>
          </div>

          {/* Action */}
          <Link
            to={`/assignments/${assignment._id}`}
            className="text-sm font-medium text-purple-600 hover:text-purple-700 transition"
          >
            View →
          </Link>
        </div>
      </div>
    </>
  );
};

export default AssignmentCard;
