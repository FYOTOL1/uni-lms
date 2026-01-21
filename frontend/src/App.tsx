import { createBrowserRouter, RouterProvider } from "react-router";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import Header from "./components/pages/home/Header";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <>
          <Header />
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
