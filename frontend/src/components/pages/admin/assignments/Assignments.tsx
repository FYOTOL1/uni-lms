import type { TMeRequest } from "../../../../types/auth/authTypes";
import AssignmentsTable from "./AssignmentsTable";

const Assignments = ({ user }: { user: TMeRequest }) => {
  return (
    <>
      <AssignmentsTable user={user} />
    </>
  );
};

export default Assignments;
