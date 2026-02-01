import type { TMeRequest } from "../../../../types/auth/authTypes";
import type { TAssignmentSchemaType } from "../../../../types/schema/AssignmentSchemaType";
import type {
  TCalendarSchemaType,
  TLectureCalendarType,
  TSectionCalendarType,
} from "../../../../types/schema/CalendarSchemaType";
import type { TSubjectSchemaType } from "../../../../types/schema/SubjectSchemaType";

type Props = {
  users: TMeRequest[];
  subjects: TSubjectSchemaType[];
  calendars: TCalendarSchemaType[];
  lectures: TLectureCalendarType[];
  sections: TSectionCalendarType[];
  assignments: TAssignmentSchemaType[];
};

const AnalysisBar = ({
  users,
  subjects,
  calendars,
  lectures,
  sections,
  assignments,
}: Props) => {
  const analysisBarCards = [
    {
      name: "users",
      length: users.length || 0,
      icon: "fa-solid fa-user",
    },
    {
      name: "subjects",
      length: subjects.length || 0,
      icon: "fa-solid fa-book",
    },
    {
      name: "calendars",
      length: calendars.length || 0,
      icon: "fa-regular fa-calendar",
    },
    {
      name: "assignments",
      length: assignments.length || 0,
      icon: "fa-solid fa-list",
    },
    {
      name: "lectures",
      length: lectures.length || 0,
      icon: "fa-solid fa-graduation-cap",
    },
    {
      name: "sections",
      length: sections.length || 0,
      icon: "fa-solid fa-file-zipper",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full my-6 px-4">
        {analysisBarCards.map(
          (e: { name: string; length: number; icon: string }) => (
            <div className="flex items-center gap-4 p-3 rounded-md bg-white outline outline-blue-200 shadow">
              <div className="flex items-center justify-center text-white bg-linear-120 from-blue-400 to-blue-600 text-xl size-12 rounded-md">
                <i className={e.icon} />
              </div>
              <div>
                <h1 className="text-lg text-gray-600">{e.name}</h1>
                <p className="text-xl font-semibold text-gray-700">
                  {e.length}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </>
  );
};

export default AnalysisBar;
