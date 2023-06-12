import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import logo from "../../assets/logo.webp";

import { useAuth } from "../../Provider/AuthProvider";
const Header = () => {
  const { user, logout } = useAuth();
  const [toggleNav, setToggleNav] = useState(false);
  const navItems = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? " font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-md"
              : "font-bold"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "   font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-md"
              : "font-bold"
          }
          to="/instructors"
        >
         Instructors
        </NavLink>
      </li>

      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "   font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-md"
              : "font-bold"
          }
          to="/classes"
        >
         Classes
        </NavLink>
      </li>


      {user && (
                  <>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? " font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                            : "font-bold"
                        }
                        to={`/dashboard/${user?.role}`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  </>
                )}
    </>
  );

  return (
    <div className="shadow-lg sticky top-0 left-0 bg-white z-50">
      <div className="container px-8 mx-auto ">
        <div className="navbar  rounded-b-lg">
          <div className="navbar-start">
            <div className="">
              <button onClick={() => setToggleNav(!toggleNav)} className="">
                <label className="btn btn-ghost px-0  lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
              </button>
              <ul
                className={`lg:hidden menu absolute bg-base-200 menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52 h-[calc(100vh-5rem)] -left-8 z-40 transform transition-all duration-300`}
                style={{
                  left: toggleNav ? "4px" : "-100%",
                }}
              >
                {navItems}
                
              </ul>
            </div>
            <NavLink
              to="/"
              className="ms-2 normal-case text-xl flex items-center justify-center gap-1"
            >
              <div className=" w-12">
                <img src={logo} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="">
                <h1 className="text-3xl font-bold">RhythmEdu</h1>
                <p
                  style={{
                    lineHeight: "1",
                  }}
                  className="text-[.6rem] font-bold p-0 m-0"
                >
                  Musical instruments learning institute
                </p>
              </div>
            </NavLink>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-1">{navItems}</ul>
          </div>
          <div className="navbar-end gap-2 sm:gap-4">
            {user ? (
              <>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <div className="indicator">
                      <FaHeart />
                      <span className="badge badge-sm indicator-item"></span>
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="card-body">
                      <span className="font-bold text-lg"> Items</span>

                      <div className="card-actions">
                        <NavLink
                          to="/favorite"
                          className="btn btn-primary btn-block"
                        >
                          View Favorites
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar relative group"
                  >
                    <div className="  ">
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
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? " font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-md py-2 px-4"
                      : "font-bold hover:text-white  hover:bg-blue-500  rounded-md py-2 px-4"
                  }
                  to="/auth/login"
                >
                  Login
                </NavLink>

                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "py-2 px-4 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-md"
                      : "font-bold hover:text-white  hover:bg-blue-500  rounded-md py-2 px-4"
                  }
                  to="/auth/register"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
