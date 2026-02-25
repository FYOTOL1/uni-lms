import type { TMeRequest } from "../../../../types/auth/authTypes";
import AssignmentsBar from "./AssignmentsBar";
import WelcomeMessage from "./WelcomeMessage";
import Subjects from "./Subjects";
import Calendar from "./Calendar";

const Home = ({ user }: { user: TMeRequest }) => {
  return (
    <>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 w-full max-w-[1440px] mx-auto mt-8 px-2">
        {/* L Other Components*/}
        <div className="lg:col-span-2">
          {/* Welcome Message */}
          <WelcomeMessage user={user} />

          {/* Subjects */}
          <Subjects />

          {/* Calendar */}
          <Calendar user={user} />
        </div>

        {/* R Assignments Notifications Bar*/}
        <div className="lg:col-span-1">
          <AssignmentsBar />
        </div>
      </div>
    </>
  );
};

export default Home;
