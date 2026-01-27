import type { TSubjectSchemaType } from "../../../../types/schema/SubjectSchemaType";
import SubjectCard from "./SubjectCard";

type TSubjectResponse = TSubjectSchemaType[];

const Subjects = ({
  subjects,
  isLoading,
}: {
  subjects: TSubjectResponse;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className="mt-12">
        <h1 className="text-3xl font-semibold text-[#333]">Subjects</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 mt-4">
          {Array.isArray(subjects) &&
            !isLoading &&
            subjects.map((e) => <SubjectCard {...e} />)}
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    </>
  );
};

export default Subjects;
