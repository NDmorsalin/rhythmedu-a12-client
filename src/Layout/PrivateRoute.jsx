import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import Loading from "../Share/Loading/Loading";

/* eslint-disable react/prop-types */
const PrivateRoute = ({ children }) => {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!user)
    return (
      <Navigate
        to={"/auth/login"}
        state={{
          from: location,
        }}
        replace
      />
    );

  return <div>{children}</div>;
};

export default PrivateRoute;
