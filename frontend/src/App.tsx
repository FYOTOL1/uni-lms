import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import useAuth from "./hooks/useAuth";
import HomePage from "./pages/home/HomePage";

const App = () => {
  const { isLoading, isLogged, student } = useAuth();

  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <>
          {!isLoading && isLogged && (
            <>
              <HomePage student={student} />
            </>
          )}

          {!isLoading && !isLogged && <Navigate to={"/auth/login"} />}
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          {!isLoading && isLogged && (
            <>
              <HomePage student={student} />
            </>
          )}

          {!isLoading && !isLogged && <Navigate to={"/auth/login"} />}
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
