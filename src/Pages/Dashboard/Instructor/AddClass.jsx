import { useForm } from "react-hook-form";
import { useAuth } from "../../../Provider/AuthProvider";
import { useEffect } from "react";
import uploadImageToCloudinary from "../../../utility/uploadImageToCloudinary";
import axiosInstance from "../../../utility/axiosInstance";

const AddClass = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit =async (data) => {
    
    if (data.classImg[0]) {
      const formData = new FormData();
      formData.append("classImg", data.classImg[0]);

      try {
        // Todo : upload image to cloudinary
        /* const cloudinaryResponce = await uploadImageToCloudinary(data.classImg[0]);
        console.log(cloudinaryResponce); */

        const classData = {
          ...data,
          classImg: 'cloudinaryResponce.url',// Todo : upload image to cloudinary
          status:'pending',
          feedback:''
        };

        const addClassRequest = await axiosInstance.post("/classes", classData);
        console.log({addClassRequest});
        
        reset();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("No image selected");
    }
  };


  useEffect(() => {
    setValue("instructorEmail", user.email); // Set the default value for instructorEmail
    setValue("instructorName", user.displayName); // Set the default value for instructorName
  }, [user, setValue]);

  return (
    <div className="h-full flex items-center justify-center">
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
              <span className="text-red-500">Class Name is required</span>
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
              <span className="text-red-500">Class Image is required</span>
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
              <span className="text-red-500">Instructor Name is required</span>
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
              <span className="text-red-500">Instructor Email is required</span>
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
              {...register("availableSeats", { required: true })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.availableSeats && (
              <span className="text-red-500">Available Seats is required</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="block mb-2 text-lg text-gray-800">
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register("price", { required: true })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </div>
        </div>

        {/* <div className="mb-3">
        <label htmlFor="enrolledStudent" className="block mb-2 text-lg text-gray-800">
          Enrolled Student
        </label>
        <input
          type="text"
          id="enrolledStudent"
          {...register('enrolledStudent', { required: true })}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        {errors.enrolledStudent && <span className="text-red-500">Enrolled Student is required</span>}
      </div>
 */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddClass;
