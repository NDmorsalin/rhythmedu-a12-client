import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../utility/axiosInstance";
import Loading from "../../../Share/Loading/Loading";

const PopularInstructor = () => {
  const {
    data: popularInstructor,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["PopularInstructor"],
    queryFn: async () => {
      const response = await axiosInstance.get("/popularinstructor");
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
      {popularInstructor?.map((instructor) => (
        <div key={instructor?._id}>
          <div
            className={`card group space-y-4 shadow-xl rounded-3xl border  p-4`}
          >
            <div
              className={`w-40   h-40 mx-auto   border relative overflow-hidden shadow-xl rounded-full`}
            >
              <img
                src={instructor?.photoUrl}
                // alt={classItem?.className}
                className=" object-cover  w-full"
              />
            </div>

            <div className="flex items-center justify-between ">
              <div className="font-bold">
                <h4 className="text-[#02224d] hover:text-blue-500 duration-500 text-xl md:text-2xl font-bold">
                  {instructor?.name}
                </h4>
                <p className="text-gray-500">{instructor?.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="">
                <p className="text-xl font-bold ">
                  Students:{instructor?.enrolledStudents?.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularInstructor;
