import ProtectedAdminRoute from "../../protectedRoutes/ProtectedAdminRoute";
import type { TMeRequest } from "../../types/auth/authTypes";
import AdminLayout from "../../components/layouts/admin/AdminLayout";
import Subjects from "../../components/pages/admin/subjects/Subjects";

const SubjectsPage = () => {
  return (
    <ProtectedAdminRoute>
      {(user: TMeRequest) => (
        <AdminLayout user={user}>
          <Subjects user={user}/>
        </AdminLayout>
      )}
    </ProtectedAdminRoute>
  );
};

export default SubjectsPage;
