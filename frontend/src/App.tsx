import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import SignupPage from "./pages/auth/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/auth/LoginPage";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isLogged } = useAuth();

  const router = createBrowserRouter([
    {
      path: "*",
      element: isLogged ? (
        <WelcomePage />
      ) : (
        <Navigate to={"/auth/login"} replace />
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
