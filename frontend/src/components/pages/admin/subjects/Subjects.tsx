import type { TMeRequest } from "../../../../types/auth/authTypes";
import SubjectsTable from "./SubjectsTable";

const Subjects = ({ user }: { user: TMeRequest }) => {
  return (
    <div>
      <SubjectsTable user={user} />
    </div>
  );
};

export default Subjects;
