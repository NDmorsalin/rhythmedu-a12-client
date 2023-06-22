import { Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import DashboardNav from "../Components/DashboradNav/DashboardNav";
import Unauthorize from "../Pages/Error/Unauthorize";

const AdminLayout = () => {
  const { user } = useAuth();
  if (user.role !== "admin") return <Unauthorize />;

  return (
    <DashboardNav>
      <div>
        <Outlet />
      </div>
    </DashboardNav>
  );
};

export default AdminLayout;
