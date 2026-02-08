import { useFetchCalendars } from "../../../../hooks/useCalendar";
import { useFetchSubjects } from "../../../../hooks/useSubjects";
import { useFetchUsers } from "../../../../hooks/useUsers";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import AnalysisBar from "./AnalysisBar";
import UsersTable from "./UsersTable";

const Dashboard = ({ user }: { user: TMeRequest }) => {
  const { users, refetch } = useFetchUsers();
  const { subjects } = useFetchSubjects();
  const { calendars } = useFetchCalendars();

  return (
    <>
      <AnalysisBar
        subjects={subjects || []}
        calendars={calendars || []}
        users={users || []}
        assignments={[]}
        lectures={[]}
        sections={[]}
      />
      <UsersTable user={user} users={users!} refetch={refetch} />
    </>
  );
};

export default Dashboard;
