import type { TMeRequest } from "../../../../types/auth/authTypes";
import LecturesTable from "./LecturesTable";

const Lectures = ({ user }: { user: TMeRequest }) => {
  return (
    <>
      <LecturesTable user={user} />
    </>
  );
};

export default Lectures;
