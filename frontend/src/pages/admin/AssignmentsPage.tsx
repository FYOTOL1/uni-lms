import ProtectedAdminRoute from "../../protectedRoutes/ProtectedAdminRoute";
import AdminLayout from "../../components/layouts/admin/AdminLayout";
import Assignments from "../../components/pages/admin/assignments/Assignments";

const AssignmentsPage = () => {
  return (
    <ProtectedAdminRoute>
      {(user) => (
        <>
          <AdminLayout user={user}>
            <Assignments user={user} />
          </AdminLayout>
        </>
      )}
    </ProtectedAdminRoute>
  );
};

export default AssignmentsPage;
