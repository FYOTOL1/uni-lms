import Header from "../../components/pages/home/Header";
import Home from "../../components/pages/home/Home";
import ProtectedUserRoute from "../../secureRoutes/ProtectedUserRoute";

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
