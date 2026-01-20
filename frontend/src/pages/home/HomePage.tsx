import Header from "../../components/pages/home/Header";
import Home from "../../components/pages/home/Home";
import type { TMeRequest } from "../../types/auth/meTypes";

const HomePage = ({ student }: { student: TMeRequest }) => {
  return (
    <>
      <Header student={student} />
      <Home student={student} />
    </>
  );
};

export default HomePage;
