import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SignupPage from "./pages/user/auth/SignupPage";
import LoginPage from "./pages/user/auth/LoginPage";
import HomePage from "./pages/user/home/HomePage";
import SubjectPage from "./pages/user/subject/SubjectPage";
import DashboardPage from "./pages/admin/DashboardPage";

const App = () => {
  const router = createBrowserRouter([
    // Admin
    {
      path: "/admin/*",
      element: <div>Admin</div>,
    },
    {
      path: "/admin/dashboard",
      element: <DashboardPage />,
    },

    // User
    {
      path: "*",
      element: <Navigate to={"/"} />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/subjects/:subjectCode",
      element: <SubjectPage />,
    },

    // Auth
    {
      path: "/auth/signup",
      element: <SignupPage />,
    },
    {
      path: "/auth/login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
