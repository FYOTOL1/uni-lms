import AdminLayout from "../../components/layouts/admin/AdminLayout";
import Lectures from "../../components/pages/admin/lectures/Lectures";
import ProtectedAdminRoute from "../../protectedRoutes/ProtectedAdminRoute";

const LecturesPage = () => {
  return (
    <ProtectedAdminRoute>
      {(user) => (
        <>
          <AdminLayout user={user}>
            <Lectures user={user}/>
          </AdminLayout>
        </>
      )}
    </ProtectedAdminRoute>
  );
};

export default LecturesPage;
