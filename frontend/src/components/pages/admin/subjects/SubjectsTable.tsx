import { useState } from "react";
import { useFetchSubjects } from "../../../../hooks/useSubjects";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import type { TSubjectSchemaType } from "../../../../types/schema/SubjectSchemaType";
import CreateSubjectPopup from "./CreateSubjectPopup";
import UpdateSubjectPopup from "./UpdateSubjectPopup";

const SubjectsTable = ({ user }: { user: TMeRequest }) => {
  const { subjects, refetch } = useFetchSubjects();

  const [isActiveCreateSubject, setIsActiveCreateSubject] =
    useState<boolean>(false);
  const [selectedSubjectToUpdate, setSelectedSubjectToUpdate] =
    useState<TSubjectSchemaType | null>(null);

  return (
    <>
      {isActiveCreateSubject && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-30"></div>
          <div className="z-40">
            <CreateSubjectPopup
              isActiveCreateSubjectPopup={isActiveCreateSubject}
              setIsActiveCreateSubjectPopup={setIsActiveCreateSubject}
            />
          </div>
        </div>
      )}
      {selectedSubjectToUpdate && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-30"></div>
          <div className="z-40">
            <UpdateSubjectPopup
              refetch={refetch}
              selectedSubjectToUpdate={selectedSubjectToUpdate}
              setSelectedSubjectToUpdate={setSelectedSubjectToUpdate}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-md shadow-sm w-full">
        <div className="flex items-center flex-col md:flex-row justify-between py-3 px-4">
          <h1 className="text-xl font-semibold text-zinc-800">Subjects</h1>
          <div className="flex items-center gap-2">
            {/* Add Subject */}
            {user.permissions.subjects.canCreate && (
              <button
                onClick={() => setIsActiveCreateSubject(true)}
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
              <th className="py-3 bg-gray-100">Code</th>
              <th className="py-3 bg-gray-100">Hours</th>
              <th className="py-3 bg-gray-100">Doctors</th>
              <th className="py-3 bg-gray-100">Year</th>
              <th className="py-3 bg-gray-100">Semester</th>
              <th className="py-3 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects &&
              subjects.map((e: TSubjectSchemaType) => (
                <tr
                  key={e._id}
                  className="text-center px-4 border-b border-gray-300 capitalize"
                >
                  <td className="py-2 bg-zinc-50  uppercase">
                    {e.subjectCode}
                  </td>
                  <td className="py-2 bg-zinc-50">{e.subjectHours}</td>
                  <td className="py-2 bg-zinc-50">{e.doctorsNames.length}</td>
                  <td className="py-2 bg-zinc-50">{e.year}</td>
                  <td className="py-2 bg-zinc-50">{e.semester}</td>
                  <td className="flex items-center justify-center gap-2 py-2 bg-zinc-50">
                    {/* Update */}
                    <button
                      onClick={() => setSelectedSubjectToUpdate(e)}
                      className="p-1 text-sm rounded-md bg-blue-400 text-white cursor-pointer transition-all hover:bg-blue-500"
                    >
                      <i className="fa-solid fa-pen" />
                    </button>

                    {/* Delete */}
                    <button className="p-1 text-sm rounded-md bg-red-400 text-white cursor-pointer transition-all hover:bg-red-500">
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

export default SubjectsTable;
