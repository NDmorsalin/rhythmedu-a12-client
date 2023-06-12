import { Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import DashboardNav from "../Components/DashboradNav/DashboardNav";

const InstructorsLayout = () => {
  const { user } = useAuth();
  if (user.role !== "instructor") return <h1>Not Authorized</h1>;

  return (
    <DashboardNav>
      <div>
        <Outlet />
      </div>
    </DashboardNav>
  );
};

export default InstructorsLayout;
