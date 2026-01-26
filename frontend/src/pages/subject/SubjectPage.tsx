import { useParams } from "react-router";
import Header from "../../components/pages/home/Header";
import Subject from "../../components/pages/subject/Subject";
import ProtectedUserRoute from "../../protectedRoutes/ProtectedUserRoute";
import { useFetchOneSubject } from "../../hooks/useSubjects";

const SubjectPage = () => {
  const subjectCode = useParams().subjectCode;

  const { subject, isLoading } = useFetchOneSubject(subjectCode!);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ProtectedUserRoute>
      {(user) => (
        <>
          <Header user={user} />
          <Subject subject={subject} />
        </>
      )}
    </ProtectedUserRoute>
  );
};

export default SubjectPage;
