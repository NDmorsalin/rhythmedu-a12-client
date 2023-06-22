import useStudentEnrolledClasses from "../../../../../hooks/useStudentEnrolledClasses";

const PaymentHistory = () => {
  const { myEnrolledClass, error, refetch, isError, isLoading } =
    useStudentEnrolledClasses();
  return (
    <div className="px-1 md:px-8 my-4 md:my-8">
      <h1 className="text-center text-3xl font-bold">My Payment history</h1>
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
                  <th>Price</th>
                  <th>Transaction Id</th>
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
                      <div className="font-bold">
                        ${item?.price?.toFixed(2)}
                      </div>
                    </td>

                    <td>
                      <div className="font-bold text-green-600">
                        {item?.transactionId}
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

export default PaymentHistory;
