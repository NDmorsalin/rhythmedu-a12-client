import axiosInstance from "../../../../utility/axiosInstance";
import { TrashIcon } from "@heroicons/react/24/solid";
import { FaCreditCard } from "react-icons/fa";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import useStudentSelectedClasses from "../../../../hooks/useStudentSelectedClasses";

const MySelectedClass = () => {
  const { mySelectedClass, error, isLoading, isError, refetch } =
    useStudentSelectedClasses();
  
  const handleDeleteClass = async (classId) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Class info!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const deleteClassRequest = await axiosInstance.delete(`/students`, {
            headers: {
              deleteclassid: classId,
            },
          });
          refetch();
          swal({
            title: "Class Deleted Successfully",
            text: "You can see your selected class in my selected class",
            icon: "success",
            buttons: false,
            timer: 2000,
          });
        } else {
          swal({
            title: "Your Class is safe!",
            icon: "success",
            buttons: false,
            timer: 2000,
          });
        }
      });
    } catch (error) {
      console.log({ error });

      swal({
        title: "Class Deleted Failed",
        text: " there is some error while deleting the class",
        icon: "error",

        timer: 2000,
      });
    }
  };

  return (
    <div>
     
      <div className="px-1 md:px-8 my-4 md:my-8">
      <h1 className="text-center text-3xl font-bold mb-2">My Selected Classes</h1>
        <div className="w-full ">
          <div className="overflow-auto">
            <table className="table table-zebra    mx-auto">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image </th>
                  <th>Class Name</th>
                  <th>Instructor Email</th>
                  <th>Price</th>
                  <th>Delete</th>
                  <th>Pay</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {mySelectedClass?.map((item, index) => (
                  <tr key={item?._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.classImg}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">{item?.className}</div>
                    </td>

                    <td>
                      <div className="font-bold">{item?.instructorEmail}</div>
                    </td>

                    <td>
                      <div className="font-bold">
                        ${item?.price?.toFixed(2)}
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">
                        <button
                          onClick={() => handleDeleteClass(item?._id)}
                          className=""
                        >
                          <TrashIcon className="w-6 h-6 text-red-500" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold">
                        <Link
                          to={"/dashboard/student/payment"}
                          state={{
                            selectedClass: item,
                          }}
                          className=""
                        >
                          <FaCreditCard className="w-6 h-6 text-blue-600" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySelectedClass;
