import { createBrowserRouter, RouterProvider } from "react-router";
import SignupPage from "./pages/auth/SignupPage";
import WelcomePage from "./pages/WelcomePage";

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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
