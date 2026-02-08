import Header from "../../../components/pages/user/shared/Header";
import Subject from "../../../components/pages/user/subject/Subject";
import ProtectedUserRoute from "../../../protectedRoutes/ProtectedUserRoute";

const SubjectPage = () => {
  return (
    <ProtectedUserRoute>
      {(user) => (
        <>
          <Header user={user} />
          <Subject />
        </>
      )}
    </ProtectedUserRoute>
  );
};

export default SubjectPage;
