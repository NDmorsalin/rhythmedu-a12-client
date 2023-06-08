import { Outlet } from "react-router-dom";
import DashboardNav from "../Components/DashboradNav/DashboardNav";

const DashboardLayout = () => {
  return (
    <>
      <DashboardNav>
        <div className="my-8 px-8">
          <Outlet />
        </div>
      </DashboardNav>
    </>
  );
};

export default DashboardLayout;
