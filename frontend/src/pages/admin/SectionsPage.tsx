import ProtectedAdminRoute from "../../protectedRoutes/ProtectedAdminRoute";
import AdminLayout from "../../components/layouts/admin/AdminLayout";
import Sections from "../../components/pages/admin/sections/Sections";

const SectionsPage = () => {
  return (
    <ProtectedAdminRoute>
      {(user) => (
        <>
          <AdminLayout user={user}>
            <Sections user={user} />
          </AdminLayout>
        </>
      )}
    </ProtectedAdminRoute>
  );
};

export default SectionsPage;
