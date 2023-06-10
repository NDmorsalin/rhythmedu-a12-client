import { useQuery } from "@tanstack/react-query";
import Loading from "../../Share/Loading/Loading";
import { useAuth } from "../../Provider/AuthProvider";
import axiosInstance from "../../utility/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const Classes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  /* 
  const {  isError, refetch, data: studentSelectedClasses = [], error } = useQuery({
    queryKey: ['studentSelectedClasses', user?.email],
    queryFn: async () => {
        if (user?.role === 'student') {

            const response = await axiosInstance.get('/students', {
                headers: {
                    studentId: user?.uid
                }
            })

            return response.data
        } else {
            return []
        }
    },

})
console.log(studentSelectedClasses); */

  const { data: allApprovedClasses, isLoading } = useQuery({
    queryKey: ["AllApprovedClasses",user?.uid],
    queryFn: async () => {
      if (user) {
        const res = await axiosInstance.get("/classes", {
          headers: {
            studentId: user?.uid,
          },
        });
        console.log('with user',res);
        return res.data;
      } else {
        const res = await axiosInstance.get("/classes");
        console.log('not user',res);
        return res.data;
      }
    },
  });

  const handleSelectClass = async (classId) => {
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
    console.log(selectedClassSavedInfo);
  };
  // console.log({ user });
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allApprovedClasses?.map((classItem) => (
          <div
            key={classItem?._id}
            className={`${
              classItem?.availableSeats <= 0 ? "bg-red-100" : "bg-base-100"
            }"card   shadow-xl `}
          >
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
                <button
                  onClick={() => handleSelectClass(classItem?._id)}
                  disabled={
                    classItem?.availableSeats <= 0 ||
                    (user?.role &&
                      (user?.role === "admin" || user?.role === "instructor"))
                  }
                  className="btn btn-outline btn-info !text-blue-600 hover:!text-white"
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
