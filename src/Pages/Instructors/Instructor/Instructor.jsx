import { Link } from "react-router-dom";

const Instructor = ({ instructor }) => {
  return (
    <div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        className={`card group space-y-4 shadow-2xl rounded-3xl border  p-4`}
      >
        <div
          className={`w-40   h-40 mx-auto   border relative overflow-hidden shadow-2xl rounded-full`}
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
              Classes:{instructor?.classes?.length}
            </p>
          </div>
          <Link
            to={`/instructors/${instructor?._id}/Classes`}
            state={{ instructor }}
            className={`btn btn-outline btn-info !text-blue-600 hover:!text-white`}
          >
            See Classes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
