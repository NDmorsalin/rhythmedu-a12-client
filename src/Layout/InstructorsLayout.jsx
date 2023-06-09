import { Outlet } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";

const InstructorsLayout = () => {
  const { user } = useAuth();
  if (user.role !== "instructor") return <h1>Not Authorized</h1>;

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default InstructorsLayout;
