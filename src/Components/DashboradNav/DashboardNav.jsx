import {
  ShoppingCartIcon,
  ShoppingBagIcon,
  UserIcon,
  ChartBarIcon,
  HomeIcon,
  MegaphoneIcon,
  AdjustmentsHorizontalIcon,
  ChartBarSquareIcon,
  QrCodeIcon,
  GiftIcon,
  ChevronDoubleLeftIcon,
  CheckBadgeIcon,
  NewspaperIcon
} from "@heroicons/react/24/solid";
import { FaAddressBook, FaChalkboardTeacher, FaFolderPlus, FaHistory, FaUsersCog } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { useAuth } from "../../Provider/AuthProvider";

const DashboardNav = ({ children }) => {
  const [toggleLeftNav, setToggleLeftNav] = useState();
  const {user} = useAuth()
 
  const studentNav = [
    { name: "My Selected Classes", path: "/student/selectedclass", Icon: CheckBadgeIcon },
    { name: "My Enrolled Classes", path: "/student/selectedclass", Icon: FaFolderPlus },
    { name: "Payment History", path: "/student/selectedclass", Icon: FaHistory },
  ]
  const adminNav = [
    { name: "Manage Users", path: "/student/selectedclass", Icon: FaUsersCog },
    { name: "Manage Classes", path: "/student/selectedclass", Icon: NewspaperIcon },
  ]
  
  const instructorNav = [
    { name: "Add A Class", path: "/dashboard/insructor/addclass", Icon: FaAddressBook },
    { name: "My Classes", path: "/dashboard/insructor/myClasses", Icon: FaChalkboardTeacher },
  ]
  let accordingToRole 
    if(user.role === "student"){
      accordingToRole = studentNav
    }else if(user.role === "admin"){
      accordingToRole = adminNav
    }else if(user.role === "instructor"){
      accordingToRole = instructorNav
    }
  
  const commonNav = [
    { name: "Ingratiation", path: "/", Icon: QrCodeIcon },
    {
      name: "My Store",
      path: "/store",
      Icon: GiftIcon,
    },
    {
      name: "Discount",
      path: "/discount",
      Icon: ChartBarSquareIcon,
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
      <div className="flex">
        <div className="w-[260px]  ">
          <div className="flex items-center justify-between px-4 gap-4 ">
            <NavLink
              to="/"
              className="ms-2 normal-case text-xl flex items-center justify-center gap-1"
            >
              <div className=" w-10 h-10 overflow-hidden rounded-full border border-blue-500">
                <img src={logo} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="">
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
            <div className="">
              <ChevronDoubleLeftIcon className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="flex-1">lo</div>
      </div>
      <div className="flex">
        <div className="w-[260px] flex justify-between  h-[calc(100vh-48px)] overflow-auto flex-col">
          <div className="my-4">
            <h2 className="text-2xl font-bold px-4"> {user.role}</h2>
            {accordingToRole.map((item, index) => (
              <NavLink
                to={item.path}
                key={item.path+index}
                className={({ isActive }) =>
                  `flex transition-all duration-300 my-1 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white items-center gap-3 text-xl ${
                    isActive ? "bg-blue-600 text-white" : ""
                  }`
                }
              >
                <span>{<item.Icon className="w-6" />}</span>
                <span className="">{item.name}</span>
              </NavLink>
            ))}
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold px-4">Common</h2>
            {commonNav.map((item, index) => (
              <NavLink
                to={item.path}
                key={item.path+index}
                className={({ isActive }) =>
                  `flex transition-all duration-300 my-1 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white items-center gap-3 text-xl ${
                    isActive ? "bg-red-600 text-white" : ""
                  }`
                }
              >
                <span>{<item.Icon className="w-6" />}</span>
                <span className="">{item.name}</span>
              </NavLink>
            ))}
          </div>
          <div className="my-4">
            <h2 className="text-2xl font-bold px-4">Seating</h2>
            {leftNavItemsInfo.map((item, index) => (
              <NavLink
                to={item.path}
                key={item.path+index}
                className={({ isActive }) =>
                  `flex transition-all duration-300 my-1 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white items-center gap-3 text-xl ${
                    isActive ? "bg-red-600 text-white" : ""
                  }`
                }
              >
                <span>{<item.Icon className="w-6" />}</span>
                <span className="">{item.name}</span>
              </NavLink>
            ))}
          </div>
         
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default DashboardNav;
