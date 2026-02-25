import { useEffect, useState } from "react";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import CreateSubjectPopup from "./CreateAssignmentPopup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import {
  deleteAssignment,
  getAssignments,
} from "../../../../store/slices/AssignmentSlice";
import type { TAssignmentSchemaType } from "../../../../types/schema/AssignmentSchemaType";
import UpdateAssignmentPopup from "./UpdateAssignmentPopup";

const AssignmentsTable = ({ user }: { user: TMeRequest }) => {
  const dispatch = useAppDispatch();
  const { assignments } = useAppSelector((state) => state.assignment);

  const [isActiveCreateAssignment, setIsActiveCreateAssignment] =
    useState<boolean>(false);
  const [selectedAssignmentToUpdate, setSelectedAssignmentToUpdate] =
    useState<TAssignmentSchemaType | null>(null);

  useEffect(() => {
    dispatch(getAssignments());
  }, [dispatch]);

  return (
    <>
      {isActiveCreateAssignment && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-30"></div>
          <div className="z-40">
            <CreateSubjectPopup
              isActiveCreateAssignmentPopup={isActiveCreateAssignment}
              setIsActiveCreateAssignmentPopup={setIsActiveCreateAssignment}
            />
          </div>
        </div>
      )}
      {selectedAssignmentToUpdate && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-30"></div>
          <div className="z-40">
            <UpdateAssignmentPopup
              selectedAssignmentToUpdate={selectedAssignmentToUpdate}
              setSelectedAssignmentToUpdate={setSelectedAssignmentToUpdate}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-md shadow-sm w-full">
        <div className="flex items-center flex-col md:flex-row justify-between py-3 px-4">
          <h1 className="text-xl font-semibold text-zinc-800">Assignments</h1>
          <div className="flex items-center gap-2">
            {/* Add Subject */}
            {user.permissions.subjects.canCreate && (
              <button
                onClick={() => setIsActiveCreateAssignment(true)}
                className="flex items-center gap-1.5 px-2 py-2 text-white rounded-sm bg-linear-150 from-blue-500 to-blue-600 cursor-pointer transition-all hover:opacity-95"
              >
                <i className="fa-solid fa-plus"></i>
                <p>Add New Subject</p>
              </button>
            )}
          </div>
        </div>

        <table className="w-full">
          <thead className="border-b border-gray-300">
            <tr className="px-4">
              <th className="py-3 bg-gray-100">Name</th>
              <th className="py-3 bg-gray-100">Subject</th>
              <th className="py-3 bg-gray-100">Deadline</th>
              <th className="py-3 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments &&
              assignments.map((e: TAssignmentSchemaType) => (
                <tr
                  key={e._id}
                  className="text-center px-4 border-b border-gray-300 capitalize"
                >
                  <td className="py-2 bg-zinc-50  uppercase">
                    {e.assignmentTitle}
                  </td>
                  <td className="py-2 bg-zinc-50">{e?.subject?.subjectCode}</td>
                  <td className="py-2 bg-zinc-50">
                    {new Date(e.deadline).toLocaleDateString()}
                  </td>
                  <td className="flex items-center justify-center gap-2 py-2 bg-zinc-50">
                    {/* Update */}
                    <button
                      onClick={() => setSelectedAssignmentToUpdate(e)}
                      className="p-1 text-sm rounded-md bg-blue-400 text-white cursor-pointer transition-all hover:bg-blue-500"
                    >
                      <i className="fa-solid fa-pen" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (e._id)
                          dispatch(deleteAssignment(e._id)).then(() => {
                            dispatch(getAssignments());
                          });
                      }}
                      className="p-1 text-sm rounded-md bg-red-400 text-white cursor-pointer transition-all hover:bg-red-500"
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AssignmentsTable;
