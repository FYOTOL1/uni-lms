import { createBrowserRouter, RouterProvider } from "react-router";
import SignupPage from "./pages/auth/SignupPage";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/auth/LoginPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <WelcomePage />,
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
