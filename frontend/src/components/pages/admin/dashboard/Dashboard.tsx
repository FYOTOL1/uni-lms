import { useFetchCalendars } from "../../../../hooks/useCalendar";
import { useFetchSubjects } from "../../../../hooks/useSubjects";
import { useFetchUsers } from "../../../../hooks/useUsers";
import AnalysisBar from "./AnalysisBar";
import Header from "./Header";

const Dashboard = () => {
  const { users } = useFetchUsers();
  const { subjects } = useFetchSubjects();
  const { calendars } = useFetchCalendars();

  return (
    <div className="grid grid-cols-8 bg-blue-50">
      {/* Left Side Navigation */}
      <div className="col-span-2">s</div>

      {/* Right Side Dashboard */}
      <div className="col-span-6">
        <Header />
        <AnalysisBar
          subjects={subjects || []}
          calendars={calendars || []}
          users={users || []}
          assignments={[]}
          lectures={[]}
          sections={[]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
