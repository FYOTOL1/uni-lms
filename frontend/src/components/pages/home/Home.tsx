import type { TSubjectSchemaType } from "../../../types/schema/SubjectSchemaType";
import type { AssignmentSchemaType } from "../../../types/schema/AssignmentSchemaType";
import type { TMeRequest } from "../../../types/auth/meTypes";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getAllSubjectsFn } from "../../../api/subjectApi";
import AssignmentsBar from "./AssignmentsBar";
import SubjectCard from "./SubjectCard";

type SubjectResponse = { message: string; subjects: TSubjectSchemaType[] };

const Home = ({ student }: { student: TMeRequest }) => {
  const { data, isLoading }: UseQueryResult<SubjectResponse> = useQuery({
    queryKey: ["subjects"],
    queryFn: getAllSubjectsFn,
  });

  const assignments: AssignmentSchemaType[] = [
    {
      _id: "121",
      subjectId: "",
      subjectName: "math1",
      assignmentTitle: "assignment-1",
      assignmentDesc:
        "b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      imgUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
      isDone: false,
    },
    {
      _id: "121",
      subjectId: "",
      subjectName: "physics",
      assignmentTitle: "assignment-4",
      assignmentDesc:
        "b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      imgUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
      isDone: false,
    },
    {
      _id: "121",
      subjectId: "",
      subjectName: "oop",
      assignmentTitle: "assignment-2",
      assignmentDesc:
        "do this and this and a b c do this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      imgUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
      isDone: false,
    },
    {
      _id: "121",
      subjectId: "",
      subjectName: "english",
      assignmentTitle: "assignment-1",
      assignmentDesc:
        "do this and this and a b c do this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b cdo this and this and a b c",
      imgUrl:
        "https://i.pinimg.com/1200x/23/87/ac/2387ac839b319df509d2a9b0c75c52da.jpg",
      deadline: new Date(),
      isDone: false,
    },
  ];

  return (
    <>
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 w-full max-w-[1440px] mx-auto  mt-8 px-2">
        {/* L Other Components*/}
        <div className="lg:col-span-2">
          {/* Welcome Message */}
          <div className="w-full">
            <h1 className="text-4xl font-semibold text-[#333]">
              Welcome back,{" "}
              <span className="capitalize bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {student && student?.studentName?.split(" ")[0]}!
              </span>
            </h1>

            <p className="text-xs text-gray-600">
              Continue your learning journey and achieve your goals.
            </p>
          </div>

          {/* Subjects */}
          <div className="mt-12">
            <h1 className="text-3xl font-semibold text-[#333]">Subjects</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 mt-4">
              {Array.isArray(data?.subjects) &&
                !isLoading &&
                data.subjects.map((e) => <SubjectCard {...e} />)}
              {isLoading && <div>Loading...</div>}
            </div>
          </div>
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
