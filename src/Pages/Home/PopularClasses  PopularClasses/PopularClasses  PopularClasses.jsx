import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utility/axiosInstance";
import Loading from "../../../Share/Loading/Loading";

const PopularClasses = () => {
  const {
    data: popularclass,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const response = await axiosInstance.get("/popularclass");
      return response.data;
    },
  });
//   console.log(popularclass);

if (isLoading) return <Loading />;
  return (
    <div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {popularclass?.map((classItem) => (
          <div
            key={classItem?._id}
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
              <div className="transition-all duration-700 absolute top-4 -right-full group-hover:right-4  flex items-center flex-col gap-2"></div>
            </div>
            <h4 className="text-[#02224d] hover:text-blue-500 duration-500 text-xl md:text-2xl font-bold">
              {classItem?.className}
            </h4>
            <div className="flex items-center justify-between ">
              <div className="font-bold">
                Instructor: {classItem?.instructorName}
              </div>
              <div className="">seats: {classItem?.availableSeats}</div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-blue-500">
                ${classItem?.price.toFixed(2)}
              </p>

              <p className="text-2xl font-bold">
                Students {"  "}
                {classItem?.enrolledStudents}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
