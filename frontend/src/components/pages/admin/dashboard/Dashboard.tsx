import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHook";
import { useFetchCalendars } from "../../../../hooks/useCalendar";
import { useFetchSubjects } from "../../../../hooks/useSubjects";
import { useFetchUsers } from "../../../../hooks/useUsers";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import AnalysisBar from "./AnalysisBar";
import UsersTable from "./UsersTable";
import { getLectures } from "../../../../store/slices/LectureSlice";

const Dashboard = ({ user }: { user: TMeRequest }) => {
  const dispatch = useAppDispatch();

  const { lectures } = useAppSelector((state) => state.lecture);

  const { users, refetch } = useFetchUsers();
  const { subjects } = useFetchSubjects();
  const { calendars } = useFetchCalendars();

  useEffect(() => {
    dispatch(getLectures());
  }, [dispatch]);

  return (
    <>
      <AnalysisBar
        subjects={subjects || []}
        calendars={calendars || []}
        users={users || []}
        assignments={[]}
        lectures={lectures || []}
        sections={[]}
      />
      <UsersTable user={user} users={users!} refetch={refetch} />
    </>
  );
};

export default Dashboard;
