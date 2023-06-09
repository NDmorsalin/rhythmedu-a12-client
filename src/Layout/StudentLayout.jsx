import { Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const StudentLayout = () => {
  const { user } = useAuth();
  if (user.role !== "student") return <h1>Not Authorized</h1>;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default StudentLayout;
