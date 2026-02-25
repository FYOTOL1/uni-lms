import type { TMeRequest } from "../../../../types/auth/authTypes";
import SectionsTable from "./sectionsTable";

const Sections = ({ user }: { user: TMeRequest }) => {
  return (
    <>
      <SectionsTable user={user} />
    </>
  );
};

export default Sections;
