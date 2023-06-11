import { useQuery } from "@tanstack/react-query";
import Loading from "../../Share/Loading/Loading";
import { useAuth } from "../../Provider/AuthProvider";
import axiosInstance from "../../utility/axiosInstance";
import ClassesCard from "./ClassesCard";

const Classes = () => {
  const { user } = useAuth();
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

  const {
    data: allApprovedClasses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllApprovedClasses", user?.uid],
    queryFn: async () => {
      if (user) {
        const res = await axiosInstance.get("/classes", {
          headers: {
            studentId: user?.uid,
          },
        });
        // console.log("with user", res);
        return res.data;
      } else {
        const res = await axiosInstance.get("/classes");
        // console.log("not user", res);
        return res.data;
      }
    },
  });

  // console.log({ user });
  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {allApprovedClasses?.map((classItem) => (
          <ClassesCard
            key={classItem?._id}
            classItem={classItem}
            user={user}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
};

export default Classes;
