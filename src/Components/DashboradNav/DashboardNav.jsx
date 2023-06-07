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
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";

const DashboardNav = ({ children }) => {
  const [toggleLeftNav, setToggleLeftNav] = useState();
  const leftNavItemsMenu = [
    { name: "Dashboard", path: "/", Icon: HomeIcon },
    {
      name: "Orders",
      path: "/orders",
      Icon: ShoppingCartIcon,
    },
    {
      name: "Products",
      path: "/products",
      Icon: ShoppingBagIcon,
    },
    { name: "Customers", path: "/customers", Icon: UserIcon },

    { name: "Analytics", path: "/analytics", Icon: ChartBarIcon },
    {
      name: "Marketing",
      path: "/marketing",
      Icon: MegaphoneIcon,
    },
  ];
  const leftNavItemsSealsItems = [
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
                <h1 className="text-3xl font-bold">Role</h1>
                <p
                  style={{
                    lineHeight: "1",
                  }}
                  className="text-[.6rem] font-bold p-0 m-0"
                >
                  RhythmEdu
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
            <h2 className="text-2xl font-bold px-4">Menu</h2>
            {leftNavItemsMenu.map((item, index) => (
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
            <h2 className="text-2xl font-bold px-4">Common</h2>
            {leftNavItemsSealsItems.map((item, index) => (
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
        <div className="flex-1 bg-slate-400">{children}</div>
      </div>
    </>
  );
};

export default DashboardNav;
