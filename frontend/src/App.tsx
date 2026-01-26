import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import SubjectPage from "./pages/subject/SubjectPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <>
          <Navigate to={"/"} />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <HomePage />
        </>
      ),
    },
    {
      path: "/subjects/:subjectCode",
      element: (
        <>
          <SubjectPage />
        </>
      ),
    },
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
