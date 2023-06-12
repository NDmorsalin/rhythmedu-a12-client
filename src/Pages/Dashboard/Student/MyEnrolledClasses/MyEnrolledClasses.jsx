import useStudentEnrolledClasses from "../../../../hooks/useStudentEnrolledClasses";

const MyEnrolledClasses = () => {
  const { myEnrolledClass, error, refetch, isError, isLoading } =
    useStudentEnrolledClasses();
  return (
    <div>
      <h1>My Selected Class</h1>
      <div className="px-8 my-8">
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
                  <th>Status</th>
                  <th>payment Date</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {myEnrolledClass?.map((item, index) => (
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
                      <div className="font-bold text-green-600">
                        {item?.paymentStatus}
                      </div>
                    </td>

                    <td>
                      <div className="font-bold">
                        {new Date(item?.paymentDate).toLocaleString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                         
                        })}
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

export default MyEnrolledClasses;
