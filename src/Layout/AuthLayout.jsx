import { Navigate, Outlet, useLocation } from "react-router-dom";
// import Header from "../Shared/Header/Header";
// import Loading from "../Shared/Loading/Loading";
// import Footer from "../Shared/Footer/Footer";
import Header from "../Share/Header/Header";
import { useAuth } from "../Provider/AuthProvider";

const AuthLayout = () => {
  const { user, loading, error } = useAuth();
  const location = useLocation();

  // console.log("layout ", { location, user, loading, error }); 

  return (
    <>
      <Header />
      {/*
      {loading && <Loading />}*/}
      {user && !loading && !error && (
        <Navigate to={location?.state?.from?.pathname || "/"} />
      )}
      {!user && <Outlet />}

      {/* <Footer />  */}
    </>
  );
};

export default AuthLayout;
