import { useAppSelector } from "../../../../hooks/reduxHook";
import HomeAssignmentCard from "./HomeAssignmentCard";

const AssignmentsBar = () => {
  const { subjects } = useAppSelector((state) => state.subject);

  return (
    <>
      <div className="bg-white outline outline-purple-100 p-3 py-3 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="text-[14px] text-purple-600 fa-solid fa-list-check"></i>
            <h1 className="font-semibold text-[#333]">Assignments</h1>
          </div>
        </div>

        <hr className="my-3 text-gray-300" />

        <div className="flex flex-col gap-3">
          {subjects &&
            subjects.map(
              (e) =>
                e.assignments &&
                e.assignments.map((a) => (
                  <HomeAssignmentCard key={a._id} subject={e} assignment={a} />
                )),
            )}
        </div>
      </div>
    </>
  );
};

export default AssignmentsBar;
