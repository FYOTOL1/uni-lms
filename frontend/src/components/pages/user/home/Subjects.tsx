import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import SubjectCard from "./SubjectCard";
import { getSubjects } from "../../../../store/slices/SubjectSlice";

const Subjects = () => {
  const { subjects, status } = useAppSelector((state) => state.subject);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  return (
    <>
      <div className="mt-12">
        <h1 className="text-3xl font-semibold text-[#333]">Subjects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 mt-4">
          {subjects?.length &&
            status != "pending" &&
            subjects.map((e) => <SubjectCard subject={e} />)}
          {status == "pending" && <div>Loading...</div>}
        </div>
      </div>
    </>
  );
};

export default Subjects;
