import { FaCartPlus } from "react-icons/fa";
import swal from "sweetalert";
import axiosInstance from "../../utility/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ClassesCard = ({ classItem, user, refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [axiosLoading, setAxiosLoading] = useState(false);
  const handleSelectClass = async (classId) => {
    setAxiosLoading(true);
    console.log(classId);
    if (!user) {
      swal({
        title: "You arn not logged in!",
        text: "To select music class you have to login first!",
        icon: "warning",
        buttons: ["Don't Want", true],
      }).then((willDelete) => {
        if (willDelete) {
          swal({
            title: "Now you are redirect to login page!",
            text: "after login you will redirect to this page again!",
            icon: "success",
            buttons: false,
            timer: 2000,
          });
          navigate("/auth/login", { state: { from: location } });
          return;
        } else {
          swal("Your imaginary file is safe!", {
            timer: 3000,
          });
          return;
        }
      });
      return;
    }
    const selectedClassSavedInfo = await axiosInstance.post("/students", {
      studentId: user.uid,
      classId,
    });
    refetch();
    setAxiosLoading(false);

    swal({
      title: "You have successfully select a class!",
      icon: "success",
      buttons: false,
      timer: 2000,
    });
  };
  return (
    <div
      data-aos="zoom-in"
      data-aos-duration="1000"
      className={`${
        classItem?.availableSeats <= 0 ? "border-red-600" : ""
      } "card group space-y-4 shadow-2xl rounded-3xl border  p-4`}
    >
      <div
        className={`${
          classItem?.availableSeats <= 0 && "border-red-600 border"
        } border relative overflow-hidden shadow-2xl rounded-3xl`}
      >
        <img
          src={classItem?.classImg}
          alt={classItem?.className}
          className=" object-cover h-[400px] w-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 "></div>{" "}
        {/*  <Link
          to={`/doll/${classItem?._id}`}
          className="bg-blue-500 text-white  py-2 px-4 rounded-full transition-all duration-700 absolute left-1/2 -translate-x-1/2 -bottom-full group-hover:bottom-4 flex items-center justify-between gap-3"
        >
          View <FaEye />
        </Link> */}
        <div className="transition-all duration-700 absolute top-4 -right-full group-hover:right-4  flex items-center flex-col gap-2">
          <button
            onClick={() => handleSelectClass(classItem?._id)}
            disabled={
              classItem?.availableSeats <= 0 ||
              classItem?.isThisClassSelected ||
              classItem?.isPaid ||
              axiosLoading ||
              (user?.role &&
                (user?.role === "admin" || user?.role === "instructor"))
            }
            className={`${
              classItem?.availableSeats <= 0
                ? "!border-red-600 !text-red-600"
                : ""
            } bg-white text-blue-500 border  w-12 h-12 shadow shadow-blue-300 py-2 px-4 rounded-full  flex items-center justify-between gap-3`}
          >
            <FaCartPlus />
          </button>
          {/* <button className="bg-white text-blue-500 w-12 h-12 shadow shadow-blue-300  py-2 px-4 rounded-full flex items-center justify-between gap-3">
            <FaHeart />
          </button> */}
        </div>
      </div>
      <h4 className="text-[#02224d] hover:text-blue-500 duration-500 text-xl md:text-2xl font-bold">
        {classItem?.className}
      </h4>
      <div className="flex items-center justify-between ">
        <div className="font-bold">Instructor: {classItem?.instructorName}</div>
        <div className="">seats: {classItem?.availableSeats}</div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-bold text-blue-500">
          ${classItem?.price.toFixed(2)}
        </p>
        <button
          onClick={() => handleSelectClass(classItem?._id)}
          disabled={
            classItem?.availableSeats <= 0 ||
            classItem?.isThisClassSelected ||
            classItem?.isPaid ||
            axiosLoading ||
            (user?.role &&
              (user?.role === "admin" || user?.role === "instructor"))
          }
          className={`${
            classItem?.availableSeats <= 0
              ? "!border-red-600 !text-red-600"
              : ""
          } btn btn-outline btn-info !text-blue-600 hover:!text-white`}
        >
          {classItem?.availableSeats <= 0 && "Stock Out"}

          {classItem?.isThisClassSelected && "Already Selected"}
          {classItem?.isPaid && "Paid"}

          {(user?.role === "admin" || user?.role === "instructor") &&
            !classItem?.availableSeats <= 0 &&
            `can't Select`}

          {axiosLoading && "Loading..."}

          {classItem?.availableSeats <= 0 ||
            classItem?.isThisClassSelected ||
            classItem?.isPaid ||
            axiosLoading ||
            (user?.role &&
              (user?.role === "admin" || user?.role === "instructor")) ||
            "Select"}
        </button>
      </div>
    </div>
  );
};

export default ClassesCard;
