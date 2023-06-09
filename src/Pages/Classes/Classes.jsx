import { useQuery } from "@tanstack/react-query";
import Loading from "../../Share/Loading/Loading";
import { useAuth } from "../../Provider/AuthProvider";
import axiosInstance from "../../utility/axiosInstance";

const Classes = () => {
  const { user } = useAuth();
  const { data: allApprovedClasses, isLoading } = useQuery({
    queryKey: ["AllApprovedClasses"],
    queryFn: async () => {
      const res = await axiosInstance.get("/classes");
      return res.data;
    },
  });
  if (isLoading) return <Loading />;

  console.log({ allApprovedClasses });
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allApprovedClasses?.map((classItem) => (
          <div key={classItem?._id} className="card  bg-base-100 shadow-xl">
            <figure>
              <img
                src={classItem?.classImg}
                alt={classItem?.className}
                className="w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="">
                <h2 className="card-title text-3xl font-bold">
                  {classItem?.className}
                </h2>
                <p className="text-xl font-semibold">
                  {classItem?.instructor?.name}
                </p>
                <div className="flex items-center justify-between ">
                  <div className="">
                    Available seats: {classItem?.availableSeats}
                  </div>
                  <div className="">Price: ${classItem?.price.toFixed(2)}</div>
                </div>
              </div>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
