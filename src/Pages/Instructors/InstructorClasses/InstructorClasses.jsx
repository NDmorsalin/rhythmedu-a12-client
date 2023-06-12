import { useAuth } from "../../../Provider/AuthProvider";
import useSingleInstructorClasses from "../../../hooks/useSingleInstructourClasses";
import ClassesCard from "../../Classes/ClassesCard";

const InstructorClasses = () => {
  const { user } = useAuth();

  const { refetch, singleInstructorWithClasses } = useSingleInstructorClasses();
  const { instructor, instructorClasses } = singleInstructorWithClasses;

//   console.log({ instructor, instructorClasses });

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-[#02224d]">
        {instructor?.name}&apos;s Classes
      </h1>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {instructorClasses?.map((classItem) => (
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

export default InstructorClasses;
