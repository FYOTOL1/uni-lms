import { Link } from "react-router";
import type { AssignmentSchemaType } from "../../../types/schema/AssignmentSchemaType";
import AssignmentCard from "./AssignmentCard";

const AssignmentsBar = ({
  assignments,
}: {
  assignments: AssignmentSchemaType[];
}) => {
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
            <AssignmentCard assignment={e} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AssignmentsBar;
