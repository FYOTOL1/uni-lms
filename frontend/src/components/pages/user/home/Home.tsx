import type { TAssignmentSchemaType } from "../../../../types/schema/AssignmentSchemaType";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import AssignmentsBar from "./AssignmentsBar";
import WelcomeMessage from "./WelcomeMessage";
import Subjects from "./Subjects";
import Calendar from "./Calendar";
import type { TSubjectSchemaType } from "../../../../types/schema/SubjectSchemaType";

const Home = ({ user }: { user: TMeRequest }) => {
  const assignments: TAssignmentSchemaType[] = [
    {
      _id: "1245",
      subject: {
        _id: "121",
        subjectName: "mathematics1",
        subjectCode: "math-1",
        subjectDesc: "mathematics description",
        subjectHours: 3,
        doctorsNames: ["mahmoud", "mohammed"],
        lectures: [],
        assignments: [],
        sections: [],
        book: "",
      } as TSubjectSchemaType,
      assignmentTitle: "assignment-1",
      assignmentDesc:
        "b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      attachmentUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
    },
    {
      _id: "1231231",
      subject: {
        _id: "121",
        subjectName: "mathematics1",
        subjectCode: "math-1",
        subjectDesc: "mathematics description",
        subjectHours: 3,
        doctorsNames: ["mahmoud", "mohammed"],
        lectures: [],
        assignments: [],
        sections: [],
        book: "",
      } as TSubjectSchemaType,
      assignmentTitle: "assignment-1",
      assignmentDesc:
        "b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      attachmentUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
    },
    {
      _id: "12461",
      subject: {
        _id: "121",
        subjectName: "mathematics1",
        subjectCode: "math-1",
        subjectDesc: "mathematics description",
        subjectHours: 3,
        doctorsNames: ["mahmoud", "mohammed"],
        lectures: [],
        assignments: [],
        sections: [],
        book: "",
      } as TSubjectSchemaType,
      assignmentTitle: "assignment-1",
      assignmentDesc:
        "b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      attachmentUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
    },
    {
      _id: "1232312",
      subject: {
        _id: "121",
        subjectName: "mathematics1",
        subjectCode: "math-1",
        subjectDesc: "mathematics description",
        subjectHours: 3,
        doctorsNames: ["mahmoud", "mohammed"],
        lectures: [],
        assignments: [],
        sections: [],
        book: "",
      } as TSubjectSchemaType,
      assignmentTitle: "assignment-1",
      assignmentDesc:
        "b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      attachmentUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
    },
    {
      _id: "18621",
      subject: {
        _id: "121",
        subjectName: "mathematics1",
        subjectCode: "math-1",
        subjectDesc: "mathematics description",
        subjectHours: 3,
        doctorsNames: ["mahmoud", "mohammed"],
        lectures: [],
        assignments: [],
        sections: [],
        book: "",
      } as TSubjectSchemaType,
      assignmentTitle: "assignment-1",
      assignmentDesc:
        "b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      attachmentUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
    },
  ];

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
          <AssignmentsBar assignments={assignments} />
        </div>
      </div>
    </>
  );
};

export default Home;
