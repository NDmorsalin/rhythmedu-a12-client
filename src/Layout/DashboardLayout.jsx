import { Outlet } from "react-router-dom";
import DashboardNav from "../Components/DashboradNav/DashboardNav";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNav>
         <Outlet />
      </DashboardNav>
    </>
  );
};

export default DashboardLayout;
