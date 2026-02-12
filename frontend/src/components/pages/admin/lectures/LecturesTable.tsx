import { useEffect, useState } from "react";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import CreateSubjectPopup from "./CreateLecturePopup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import {
  deleteLecture,
  getLectures,
} from "../../../../store/slices/LectureSlice";
import type { TLectureSchemaType } from "../../../../types/schema/LectureSchemaType";
import UpdateLecturePopup from "./UpdateLecturePopup";

const LecturesTable = ({ user }: { user: TMeRequest }) => {
  const dispatch = useAppDispatch();
  const { lectures } = useAppSelector((state) => state.lecture);

  const [isActiveCreateLecture, setIsActiveCreateLecture] =
    useState<boolean>(false);
  const [selectedLectureToUpdate, setSelectedLectureToUpdate] =
    useState<TLectureSchemaType | null>(null);

  useEffect(() => {
    dispatch(getLectures());
  }, [dispatch]);

  return (
    <>
      {isActiveCreateLecture && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-30"></div>
          <div className="z-40">
            <CreateSubjectPopup
              isActiveCreateLecturePopup={isActiveCreateLecture}
              setIsActiveCreateLecturePopup={setIsActiveCreateLecture}
            />
          </div>
        </div>
      )}
      {selectedLectureToUpdate && (
        <div className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0">
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-30"></div>
          <div className="z-40">
            <UpdateLecturePopup
              selectedLectureToUpdate={selectedLectureToUpdate}
              setSelectedLectureToUpdate={setSelectedLectureToUpdate}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-md shadow-sm w-full">
        <div className="flex items-center flex-col md:flex-row justify-between py-3 px-4">
          <h1 className="text-xl font-semibold text-zinc-800">Lectures</h1>
          <div className="flex items-center gap-2">
            {/* Add Subject */}
            {user.permissions.subjects.canCreate && (
              <button
                onClick={() => setIsActiveCreateLecture(true)}
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
              <th className="py-3 bg-gray-100">Date</th>
              <th className="py-3 bg-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {lectures &&
              lectures.map((e: TLectureSchemaType) => (
                <tr
                  key={e._id}
                  className="text-center px-4 border-b border-gray-300 capitalize"
                >
                  <td className="py-2 bg-zinc-50  uppercase">
                    {e.lectureName}
                  </td>
                  <td className="py-2 bg-zinc-50">{e?.subject?.subjectCode}</td>
                  <td className="py-2 bg-zinc-50">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex items-center justify-center gap-2 py-2 bg-zinc-50">
                    {/* Update */}
                    <button
                      onClick={() => setSelectedLectureToUpdate(e)}
                      className="p-1 text-sm rounded-md bg-blue-400 text-white cursor-pointer transition-all hover:bg-blue-500"
                    >
                      <i className="fa-solid fa-pen" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => {
                        if (e._id)
                          dispatch(deleteLecture(e._id)).then(() => {
                            dispatch(getLectures());
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

export default LecturesTable;
