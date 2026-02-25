import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import HomeAssignmentCard from "./HomeAssignmentCard";
import { getAssignments } from "../../../../store/slices/AssignmentSlice";

const AssignmentsBar = () => {
  const { assignments } = useAppSelector((state) => state.assignment);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAssignments());
  }, [dispatch]);

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
          {assignments &&
            assignments.map((e) => <HomeAssignmentCard key={e._id} e={e} />)}
        </div>
      </div>
    </>
  );
};

export default AssignmentsBar;
