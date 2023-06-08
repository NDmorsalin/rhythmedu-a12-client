import { useFetchInstructorClasses } from "../../../hooks/useFetchClasses";

const MyClasses = () => {
    const {myClasses,error,isError,isLoading,refetch} = useFetchInstructorClasses();
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table  mx-auto">
          {/* head */}
          <thead>
            <tr>
              <th>
                
                #
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
          {
                myClasses?.map((item,index)=>(
                    <tr key={item._id}>
                    <th>
                     {index + 1}
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item?.classImg}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-sm opacity-50">United States</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Zemlak, Daniel and Leannon
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>Purple</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))

          }
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
