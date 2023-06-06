import { Outlet } from "react-router-dom";
import Header from "../Share/Header/Header";
import Footer from "../Share/Footer/Footer";
import useChangeTitle from "../hooks/useChangeTitle";

const HomeLayout = () => {
  const pathTitle = [
    { path: "/", title: "RhythmEdu | Home" },

    { path: "/aboutus", title: "RhythmEdu | About Us" },
    { path: "/login", title: "RhythmEdu | Login" },
    { path: "/register", title: "RhythmEdu | Register" },
  ];

  useChangeTitle(pathTitle);
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
