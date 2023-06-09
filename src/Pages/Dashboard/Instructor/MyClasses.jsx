import { useFetchInstructorClasses } from "../../../hooks/useFetchClasses";
import { TrashIcon } from "@heroicons/react/24/solid";
import ClassUpdateForm from "../../../Components/ClassUpdateForm/ClassUpdateForm";
import axiosInstance from "../../../utility/axiosInstance";

const MyClasses = () => {
  const { myClasses, error, isError, isLoading, refetch } =
    useFetchInstructorClasses();

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
          const deleteClassRequest = await axiosInstance.delete(
            `/myClasses/${classId}`
          );
          console.log({ deleteClassRequest });
          refetch();

          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Class is safe!");
        }
      });
    } catch (error) {
      console.error(error);

      swal({
        title: "Class Deleted Failed",
        text: " there is some error while deleting the class",
        icon: "error",

        timer: 2000,
      });
    }
  };

  return (
    <div className="px-8 my-8">
      <div className="w-full ">
        <div className="overflow-auto">
          <table className="table  mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image </th>
                <th>Name</th>
                <th>Price</th>
                <th>Available seats</th>
                <th>Approved Status</th>
                <th>Students</th>
                <th>Feedback</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {myClasses?.map((item, index) => (
                <tr key={item._id}>
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
                  <td>{item?.price}</td>

                  <td>
                    <div className="font-bold">{item?.availableSeats}</div>
                  </td>
                  <td>
                    <div className="font-bold">{item?.status}</div>
                  </td>
                  <td>
                    <div className="font-bold">{item?.enrolledStudents}</div>
                  </td>
                  <td>
                    <div className="font-bold">
                      {/* The button to open modal */}
                      <label
                        htmlFor={`feedback_${item._id}`}
                        className="btn btn-info"
                      >
                        Show
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`feedback_${item._id}`}
                        className="modal-toggle"
                      />
                      <div className="modal ">
                        <div className="modal-box max-w-2xl">
                          {item?.feedback ? (
                            <>
                              <p className="">{item?.feedback}</p>
                            </>
                          ) : (
                            <>
                              <h2 className="text-2xl">
                                Your feedback is pending
                              </h2>
                            </>
                          )}

                          <div className="modal-action">
                            <label
                              htmlFor={`feedback_${item._id}`}
                              className="btn btn-warning "
                            >
                              Close!
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">
                      {/* The button to open modal */}
                      <label
                        htmlFor={`update_${item._id}`}
                        className="btn btn-warning btn-outline"
                      >
                        Update
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`update_${item._id}`}
                        className="modal-toggle"
                      />
                      <div className="modal ">
                        <div className="modal-box max-w-2xl">
                          <ClassUpdateForm
                            refetch={refetch}
                            addedClass={item}
                          />

                          <div className="modal-action">
                            <label
                              htmlFor={`update_${item._id}`}
                              className="btn btn-warning "
                            >
                              Close!
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">
                      <button
                        onClick={() => handleDeleteClass(item._id)}
                        className=""
                      >
                        <TrashIcon className="w-6 h-6 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
