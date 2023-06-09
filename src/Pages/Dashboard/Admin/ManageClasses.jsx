import { TrashIcon } from "@heroicons/react/24/solid";
import ClassUpdateForm from "../../../Components/ClassUpdateForm/ClassUpdateForm";

const ManageClasses = () => {
  
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
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;
