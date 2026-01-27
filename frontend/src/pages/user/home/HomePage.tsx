import Header from "../../../components/pages/user/home/Header";
import Home from "../../../components/pages/user/home/Home";
import ProtectedUserRoute from "../../../protectedRoutes/ProtectedUserRoute";

const HomePage = () => {
  return (
    <ProtectedUserRoute>
      {(user) => (
        <>
          <Header user={user} />
          <Home user={user} />
        </>
      )}
    </ProtectedUserRoute>
  );
};

export default HomePage;
