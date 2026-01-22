import { createBrowserRouter, RouterProvider } from "react-router";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import Header from "./components/pages/home/Header";
import ProtectedUserRoute from "./secureRoutes/ProtectedUserRoute";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: (
        <>
          <ProtectedUserRoute>
            {(user)=> <Header user={user}/>}
          </ProtectedUserRoute>
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
