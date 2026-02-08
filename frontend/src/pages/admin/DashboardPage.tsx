import AdminLayout from "../../components/layouts/admin/AdminLayout";
import Dashboard from "../../components/pages/admin/dashboard/Dashboard";
import ProtectedAdminRoute from "../../protectedRoutes/ProtectedAdminRoute";
import type { TMeRequest } from "../../types/auth/authTypes";

const DashboardPage = () => {
  return (
    <ProtectedAdminRoute>
      {(user: TMeRequest) => (
        <AdminLayout user={user}>
          <Dashboard user={user} />
        </AdminLayout>
      )}
    </ProtectedAdminRoute>
  );
};

export default DashboardPage;
