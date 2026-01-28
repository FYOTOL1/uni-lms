import type { TAssignmentSchemaType } from "../../../../types/schema/AssignmentSchemaType";
import type { TMeRequest } from "../../../../types/auth/authTypes";
import AssignmentsBar from "./AssignmentsBar";
import WelcomeMessage from "./WelcomeMessage";
import Subjects from "./Subjects";
import Calendar from "./Calendar";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useFetchSubjects } from "../../../../hooks/useSubjects";
import type { TSubjectSchemaType } from "../../../../types/schema/SubjectSchemaType";

const Home = ({ user }: { user: TMeRequest }) => {
  const { subjects, isLoading, isError, error } = useFetchSubjects();
  const assignments: TAssignmentSchemaType[] = [
    {
      _id: "121",
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
      _id: "121",
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
      _id: "121",
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
      _id: "121",
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
      _id: "121",
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

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Failed To Get Subjects!");
    }
  }, [error, isError]);

  return (
    <>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 w-full max-w-[1440px] mx-auto mt-8 px-2">
        {/* L Other Components*/}
        <div className="lg:col-span-2">
          {/* Welcome Message */}
          <WelcomeMessage user={user} />

          {/* Subjects */}
          <Subjects subjects={subjects} isLoading={isLoading} />

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
