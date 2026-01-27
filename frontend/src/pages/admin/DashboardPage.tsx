import Dashboard from "../../components/pages/admin/dashboard/Dashboard";
import ProtectedAdminRoute from "../../protectedRoutes/ProtectedAdminRoute";

const DashboardPage = () => {
  return <ProtectedAdminRoute>{() => <Dashboard />}</ProtectedAdminRoute>;
};

export default DashboardPage;
