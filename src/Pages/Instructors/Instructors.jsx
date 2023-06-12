import Loading from "../../Share/Loading/Loading";
import useFetchAllInstructor from "../../hooks/useFetchAllInstructor";
import Instructor from "./Instructor/Instructor";

const Instructors = () => {
  const { allInstructors, isLoading } = useFetchAllInstructor();
  // console.log(allInstructors);

  if (isLoading) return <Loading />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allInstructors?.map((instructor) => (
        <Instructor key={instructor?._id} instructor={instructor} />
      ))}
    </div>
  );
};

export default Instructors;
