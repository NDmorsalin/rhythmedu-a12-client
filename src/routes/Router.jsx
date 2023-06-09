import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home";
import Error404Page from "../Pages/Error/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Instructors from "../Pages/Instructors/Instructors";
import Classes from "../Pages/Classes/Classes";
import PrivateRoute from "../Layout/PrivateRoute";
import AddClass from "../Pages/Dashboard/Instructor/AddClass";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses";
import InstructorsLayout from "../Layout/InstructorsLayout";
import AdminLayout from "../Layout/AdminLayout";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      {
        path: "/Classes",
        element: <Classes />,
      },

      {
        path: "/aboutus",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "insructor",
        element: <InstructorsLayout />,
        children: [
          {
            path: "addclass",
            element: <AddClass />,
          },
          {
            path: "myClasses",
            element: <MyClasses />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "manageUser",
            element: <ManageUser />,
          },
          {
            path: "manageClasses",
            element: <ManageClasses />,
          },
        ],
      },
    ],
  },
]);

export default router;
