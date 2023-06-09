import { TrashIcon } from "@heroicons/react/24/solid";
import ClassUpdateForm from "../../../Components/ClassUpdateForm/ClassUpdateForm";
import useFetchUser from "../../../hooks/useFetchUser";
import axiosInstance from "../../../utility/axiosInstance";

const ManageUser = () => {
const {error,isError,refetch,users,isLoading} = useFetchUser()
    console.log(users);
    const handleUpdateRole = async ()=>{
      const res = await axiosInstance.put(`/user/${user._id}/role`
    }
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
                <th>Email</th>
                <th>Make Instructor</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user?.photoUrl ||
                            "https://bit.ly/40XidAA" /* if there is no image then show this placeholder image */
                          }
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{user?.displayName || (
                        <>
                          <span className="text-yellow-400">Anonymous</span>
                        </>
                      )}</div>
                  </td>
                  <td>{user?.email}</td>
                  <td>
                    <div className="">
                      <button disabled={user?.role==='instructor'} className="btn btn-info btn-outline">Make Instructor</button>
                    </div>
                  </td>
                  <td>
                  <div className="">
                      <button disabled={user?.role==='admin'} className="btn btn-primary btn-outline">Make Admin</button>
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

export default ManageUser;