import { useAuth } from "../../../Provider/AuthProvider";
import Loading from "../../../Share/Loading/Loading";
import useFetchUser from "../../../hooks/useFetchUser";
import axiosInstance from "../../../utility/axiosInstance";

const ManageUser = () => {
  const { error, isError, refetch, users, isLoading } = useFetchUser();
  const { user: admin } = useAuth();
  const handleUpdateRole = async (userId, role) => {
    try {
      const res = await axiosInstance.put(`/admin/users/${userId}`, { role });
      
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <Loading/>;
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
                <th>Make Student</th>
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
                    <div className="font-bold">
                      {user?.name || (
                        <>
                          <span className="text-yellow-400">Anonymous</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>{user?.email}</td>
                  <td>
                    <div className="">
                      <button
                        onClick={() => handleUpdateRole(user._id, "instructor")}
                        disabled={user?.role === "instructor" || user?.email === admin?.email}
                        className="btn btn-info btn-outline"
                      >
                        Make Instructor
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <button
                        onClick={() => handleUpdateRole(user._id, "admin")}
                        disabled={user?.role === "admin" || user?.email === admin?.email}
                        className="btn btn-primary btn-outline"
                      >
                        Make Admin
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="">
                      <button
                        onClick={() => handleUpdateRole(user._id, "student")}
                        disabled={user?.role === "student" || user?.email === admin?.email}
                        className="btn btn-warning btn-outline"
                      >
                        Make Student
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

export default ManageUser;
