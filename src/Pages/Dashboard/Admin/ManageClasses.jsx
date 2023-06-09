import { useFetchAllClasses } from "../../../hooks/useFetchClasses";
import Loading from "../../../Share/Loading/Loading";
import SendFeedback from "../../../Components/SendFeedback/SendFeedback";

const ManageClasses = () => {
  const { classes, error, isError, isLoading, refetch } = useFetchAllClasses();
  console.log(classes,error, isError,);
  if (isLoading) return <Loading />;
  return (
    <div className="px-8 my-8">
      <div className="w-full ">
        <div className="overflow-auto">
          <table className="table  mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Class Image </th>
                <th>Class name</th>
                <th>Instructor name</th>
                <th>Instructor email</th>
                <th>Available seats</th>
                <th>Price</th>
                <th>Current Status</th>
                <th>Approve</th>
                <th>Deny</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {classes?.map((classItem, index) => (
                <tr key={classItem?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={classItem?.classImg}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{classItem?.className}</div>
                  </td>
                  <td>
                    <div className="font-bold">
                      {classItem?.instructorEmail}
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{classItem?.instructorName}</div>
                  </td>

                  <td>
                    <div className="font-bold">{classItem?.availableSeats}</div>
                  </td>

                  <td>${classItem?.price?.toFixed(2)}</td>
                  <td>
                    <div className="font-bold">{classItem?.status}</div>
                  </td>

                  <td>
                    <div className="font-bold">
                      <button className="btn btn-outline btn-primary">
                        Approved
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">
                      <button className="btn btn-outline btn-warning">
                        Denied
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">
                      {/* The button to open modal */}
                      <label
                        htmlFor={`feedback_${classItem?._id}`}
                        className="btn btn-info btn-outline"
                      >
                        Feedback
                      </label>

                      {/* Put this part before </body> tag */}
                      <input
                        type="checkbox"
                        id={`feedback_${classItem?._id}`}
                        className="modal-toggle"
                      />
                      <div className="modal ">
                        <div className="modal-box max-w-2xl">
                          <SendFeedback
                            refetch={refetch}
                            classItem={classItem}
                          />

                          <div className="modal-action">
                            <label
                              htmlFor={`feedback_${classItem?._id}`}
                              className="btn btn-warning "
                            >
                              Close!
                            </label>
                          </div>
                        </div>
                      </div>
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

export default ManageClasses;
