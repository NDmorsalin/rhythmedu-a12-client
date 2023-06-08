import { useEffect, useState } from "react";
import { useFetchInstructorClasses } from "../../../hooks/useFetchClasses";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { useAuth } from "../../../Provider/AuthProvider";

const MyClasses = () => {
  const { myClasses, error, isError, isLoading, refetch } =
    useFetchInstructorClasses();
    const {user} = useAuth()

    const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    if (data.classImg[0]) {
      const formData = new FormData();
      formData.append("classImg", data.classImg[0]);

      try {
        // Todo : upload image to cloudinary
        const cloudinaryResponce = await uploadImageToCloudinary(
          data.classImg[0]
        );
        console.log(cloudinaryResponce);

        const classData = {
          ...data,
          classImg: cloudinaryResponce.url, // Todo : upload image to cloudinary
          status: "pending",
          feedback: "",
          enrolledStudents:0
        };

        const addClassRequest = await axiosInstance.post(
          "/myClasses",
          classData
        );
        console.log({ addClassRequest });

        reset();
        refetch();
        setLoading(false);
        swal({
          title: "Class Added Successfully",
          text: " You can view your class in My Classes section or add another class",
          type: "success",
          timer: 2000
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      console.error("No image selected");
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("instructorEmail", user.email); // Set the default value for instructorEmail
    setValue("instructorName", user.displayName); // Set the default value for instructorName
    
  }, [user, setValue]);

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
                          <form
                            // encType="multipart/form-data"
                            onSubmit={handleSubmit(onSubmit)}
                            className="max-w-md mx-auto"
                            encType="multipart/form-data"
                          >
                            <div className="grid md:grid-cols-2 gap-4 ">
                              <div className="mb-3">
                                <label
                                  htmlFor="className"
                                  className="block mb-2 text-lg text-gray-800"
                                >
                                  Class Name
                                </label>
                                <input
                                  type="text"
                                  id="className"
                                  {...register("className", { required: true })}
                                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                                {errors.className && (
                                  <span className="text-red-500">
                                    Class Name is required
                                  </span>
                                )}
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="classImg"
                                  className="block mb-2 text-lg text-gray-800"
                                >
                                  Class Image
                                </label>
                                <input
                                  id="classImg"
                                  {...register("classImg", { required: true })}
                                  type="file"
                                  className="file-input file-input-bordered file-input-primary w-full "
                                />

                                {errors.classImg && (
                                  <span className="text-red-500">
                                    Class Image is required
                                  </span>
                                )}
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="instructorName"
                                  className="block mb-2 text-lg text-gray-800"
                                >
                                  Instructor Name
                                </label>
                                <input
                                  type="text"
                                  id="instructorName"
                                  {...register("instructorName")}
                                  disabled
                                  defaultValue={user.email}
                                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                                {errors.instructorName && (
                                  <span className="text-red-500">
                                    Instructor Name is required
                                  </span>
                                )}
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="instructorEmail"
                                  className="block mb-2 text-lg text-gray-800"
                                >
                                  Instructor Email
                                </label>
                                <input
                                  type="email"
                                  id="instructorEmail"
                                  {...register("instructorEmail")}
                                  defaultValue={user.email}
                                  disabled
                                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                                {errors.instructorEmail && (
                                  <span className="text-red-500">
                                    Instructor Email is required
                                  </span>
                                )}
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="availableSeats"
                                  className="block mb-2 text-lg text-gray-800"
                                >
                                  Available Seats
                                </label>
                                <input
                                  type="number"
                                  id="availableSeats"
                                  {...register("availableSeats", {
                                    required: true,
                                  })}
                                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                                {errors.availableSeats && (
                                  <span className="text-red-500">
                                    Available Seats is required
                                  </span>
                                )}
                              </div>

                              <div className="mb-3">
                                <label
                                  htmlFor="price"
                                  className="block mb-2 text-lg text-gray-800"
                                >
                                  Price
                                </label>
                                <input
                                  type="number"
                                  id="price"
                                  {...register("price", { required: true })}
                                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                />
                                {errors.price && (
                                  <span className="text-red-500">
                                    Price is required
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="submit"
                              disabled={loading}
                              className={`w-full py-2 px-4  ${
                                loading
                                  ? "bg-blue-300"
                                  : "bg-blue-500 hover:bg-blue-600  "
                              }  text-white font-semibold rounded-lg focus:outline-none`}
                            >
                              {loading ? (
                                <div className="flex items-center justify-center gap-3">
                                  <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                  </span>
                                  Loading...
                                </div>
                              ) : (
                                "Submit"
                              )}
                            </button>
                          </form>

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
                      <TrashIcon className="w-6 h-6 text-red-500" />
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
