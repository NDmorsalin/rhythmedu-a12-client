import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utility/axiosInstance";
import uploadImageToCloudinary from "../../utility/uploadImageToCloudinary";

const ClassUpdateForm = ({ refetch, addedClass }) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.classImg[0]) {
        console.log("inside data file", { data }, data.classImg[0]);
        const formData = new FormData();
        formData.append("classImg", data.classImg[0]);

        // Todo : upload image to cloudinary
        const cloudinaryResponce = await uploadImageToCloudinary(
          data.classImg[0]
        );
        console.log(cloudinaryResponce);

        const classData = {
          ...data,
          classId: addedClass._id,
          classImg: cloudinaryResponce.url,
        };

        const addClassRequest = await axiosInstance.put(
          "/myClasses",
          classData
        );
        console.log({ addClassRequest });

        refetch();
        setLoading(false);
        swal({
          title: "Class Updated Successfully",
          text: " You can view your Updated class in My Classes section",
          icon: "success",
          timer: 2000,
        });
      } else {
        const classData = {
          ...data,
          classImg: addedClass.classImg,
          classId: addedClass._id,
        };

        const addClassRequest = await axiosInstance.put(
          "/myClasses",
          classData
        );
        console.log({ addClassRequest });
        refetch();
        setLoading(false);
        swal({
          title: "Class Updated Successfully",
          text: " You can view your Updated class in My Classes section",
          icon: "success",
          timer: 2000,
        });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("className", addedClass?.className);
    setValue("availableSeats", addedClass?.availableSeats);
    setValue("price", addedClass?.price);
  }, [setValue]);

  return (
    <div>
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
              <div className="text-red-500">Class Name is required</div>
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
              {...register("classImg")}
              type="file"
              className="file-input file-input-bordered file-input-primary w-full "
            />

            {errors.classImg && (
              <div className="text-red-500">Class Image is required</div>
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
              <div className="text-red-500">Available Seats is required</div>
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
              <div className="text-red-500">Price is required</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 my-8  ${
            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600  "
          }  text-white font-semibold rounded-lg focus:outline-none`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
              <div className="relative flex h-3 w-3">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></div>
                <div className="relative inline-flex rounded-full h-3 w-3 bg-white"></div>
              </div>
              Loading...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default ClassUpdateForm;
