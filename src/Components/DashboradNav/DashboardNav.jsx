import {
  AdjustmentsHorizontalIcon,
  ChartBarSquareIcon,
  QrCodeIcon,
  GiftIcon,
  ChevronDoubleLeftIcon,
  CheckBadgeIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import {
  FaAddressBook,
  FaChalkboardTeacher,
  FaFolderPlus,
  FaHistory,
  FaHome,
  FaUsersCog,
} from "react-icons/fa";
import {SiGoogleclassroom} from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { useAuth } from "../../Provider/AuthProvider";
import { useFetchInstructorClasses } from "../../hooks/useFetchClasses";
import useStudentSelectedClasses from "../../hooks/useStudentSelectedClasses";
import useStudentEnrolledClasses from "../../hooks/useStudentEnrolledClasses";

const DashboardNav = ({ children }) => {
  const [toggleLeftNav, setToggleLeftNav] = useState();
  const { user, logout } = useAuth();
  const { myClasses } = useFetchInstructorClasses();
  const { mySelectedClass } = useStudentSelectedClasses();
  const { myEnrolledClass } = useStudentEnrolledClasses();

  const studentNav = [
    {
      name: (
        <>
          Selected Classes{" "}
          <span className="badge badge-secondary border-white  absolute top-1/2 right-2 -translate-y-1/2 ">
            {" "}
            {mySelectedClass?.length}
          </span>
        </>
      ),
      path: "/dashboard/student",
      // path: "/dashboard/student/mySelectedClass",
      Icon: FaFolderPlus,
    },
    {
      name: (
        <>
          Enrolled Classes{" "}
          <span className="badge badge-secondary border-white  absolute top-1/2 right-2 -translate-y-1/2 ">
            {" "}
            {myEnrolledClass?.length}
          </span>
        </>
      ),
      path: "/dashboard/student/enrolledClass",
      Icon: CheckBadgeIcon,
    },
    {
      name: "Payment History",
      path: "/dashboard/student/paymenthistory",
      Icon: FaHistory,
    },
  ];
  const adminNav = [
    {
      name: "Manage Users",
      path: "/dashboard/admin",
      // path: "/dashboard/admin/manageUser",
      Icon: FaUsersCog,
    },
    {
      name: "Manage Classes",
      path: "/dashboard/admin/manageClasses",
      Icon: NewspaperIcon,
    },
  ];

  const instructorNav = [
    {
      name: "Add A Class",
      path: "/dashboard/instructor",
      // path: "/dashboard/insructor/addclass",
      Icon: FaAddressBook,
    },
    {
      name: (
        <>
          My Classes{" "}
          <span className="badge badge-secondary">+ {myClasses?.length}</span>
        </>
      ),
      path: "/dashboard/instructor/myClasses",
      Icon: FaChalkboardTeacher,
    },
  ];
  let accordingToRole;
  if (user.role === "student") {
    accordingToRole = studentNav;
  } else if (user.role === "admin") {
    accordingToRole = adminNav;
  } else if (user.role === "instructor") {
    accordingToRole = instructorNav;
  }

  const commonNav = [
    { name: "Home", path: "/", Icon: FaHome },
    {
      name: "Classes",
      path: "/classes",
      Icon: SiGoogleclassroom,
    },
    {
      name: "Instructors",
      path: "/instructors",
      Icon: GiTeacher,
    },
  ];

  const leftNavItemsInfo = [
    {
      name: "Profile setting",
      path: "/profile",
      Icon: AdjustmentsHorizontalIcon,
    },
    /* {
      name: "Get Info",
      path: "/info",
      Icon: InformationCircleIcon,
    }, */
  ];
  return (
    <>
      <div className="flex sticky top-0 left-0 z-50 bg-slate-100 shadow-md py-2">
        <div className="w-fit md:w-[260px]  ">
          <div className="flex items-center justify-between px-2 gap-2 md:px-4 md:gap-4 ">
            <NavLink
              to="/"
              className="ms-2 normal-case text-xl flex items-center justify-center gap-1"
            >
              <div className=" w-10 h-10 overflow-hidden rounded-full border border-blue-500">
                <img src={logo} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold">RhythmEdu</h1>
                <p
                  style={{
                    lineHeight: "1",
                  }}
                  className="text-[.6rem] font-bold p-0 m-0"
                >
                  {user.role} Dashboard
                </p>
              </div>
            </NavLink>
            
          </div>
        </div>
        <div className="flex-1 flex justify-end">
        {user && (
              <div className=" flex pe-3 md:pe-6">
                
                <div className="dropdown dropdown-end me-4">
                  <label
                    tabIndex={0}
                    className=" ms-auto block btn btn-ghost btn-circle avatar relative group justify-end"
                  >
                    <div className="">
                      <img
                        className="w-10 rounded-full"
                        src={
                          user?.photoURL ||
                          "https://bit.ly/40XidAA" /* if there is no image then show this placeholder image */
                        }
                      />
                    </div>
                    <h5 className="group-hover:block hidden w-fit whitespace-nowrap font-bold absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 p-2 text-white bg-slate-700 z-50 rounded">
                      {user?.displayName || (
                        <>
                          <span className="text-red-400">Anonymous</span>
                        </>
                      )}
                    </h5>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <NavLink
                        to="/me"
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? " px-2 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                              : ""
                          } justify-between`
                        }
                      >
                        Profile
                        <span className="badge">New</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? " px-2 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                            : ""
                        }
                        to="/settings"
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={logout}
                        className="btn btn-warning  text-base-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-warning  hidden sm:block"
                >
                  Logout
                </button>
              </div>
            ) }
        </div>
      </div>
      <div className="flex">
        <div className="w-fit md:w-[260px] flex justify-between  h-[calc(100vh-48px)] overflow-auto flex-col">
          <div className="my-4">
            <h2 className="hidden md:block text-2xl font-bold px-4"> {user.role}</h2>
            {accordingToRole.map((item, index) => (
              <NavLink
                to={item.path}
                key={item.path + index}
                className={({ isActive }) =>
                  `block md:flex transition-all duration-300 my-1 px-4 py-2 rounded-full relative hover:bg-blue-500 hover:text-white items-center gap-3 text-xl ${
                    isActive ? "bg-blue-600 text-white" : ""
                  }`
                }
              >
                <span>{<item.Icon className="w-6" />}</span>
                <span className="hidden md:block">{item.name}</span>
              </NavLink>
            ))}
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold px-4 hidden md:block">Common</h2>
            {commonNav.map((item, index) => (
              <NavLink
                to={item.path}
                key={item.path + index}
                className={({ isActive }) =>
                  `block md:flex transition-all duration-300 my-1 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white items-center gap-3 text-xl ${
                    isActive ? "bg-red-600 text-white" : ""
                  }`
                }
              >
                <span>{<item.Icon className="w-6" />}</span>
                <span className="hidden md:block">{item.name}</span>
              </NavLink>
            ))}
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold px-4 hidden md:block">Seating</h2>
            {leftNavItemsInfo.map((item, index) => (
              <NavLink
                to={item.path}
                key={item.path + index}
                className={({ isActive }) =>
                  `block md:flex  transition-all duration-300 my-1 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white items-center gap-3 text-xl ${
                    isActive ? "bg-red-600 text-white" : ""
                  }`
                }
              >
                <span>{<item.Icon className="w-6" />}</span>
                <span className="hidden md:block">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </>
  );
};

export default DashboardNav;
