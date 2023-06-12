import Loading from "../../Share/Loading/Loading";
import { useAuth } from "../../Provider/AuthProvider";
import ClassesCard from "./ClassesCard";
import useFetchAllApprovedClasses from "../../hooks/useFetchAllApprovedClasses";

const Classes = () => {
  const { user } = useAuth();
  const { allApprovedClasses, isLoading, refetch } =
    useFetchAllApprovedClasses();

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
