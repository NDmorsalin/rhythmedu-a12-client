import { Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const AdminLayout = () => {
  const { user } = useAuth();
  if (user.role !== "admin") return <h1>Not Authorized</h1>;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
