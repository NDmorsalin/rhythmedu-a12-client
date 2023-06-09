import { useState, useEffect } from "react";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import axiosInstance from "../../utility/axiosInstance";
import uploadImageToCloudinary from "../../utility/uploadImageToCloudinary";

const SendFeedback = ({ refetch, classItem }) => {
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
      
        console.log("inside send feedback file", { data });
        refetch();
        setLoading(false);
        swal({
          title: "Class Updated Successfully",
          text: " You can view your Updated class in My Classes section",
          icon: "success",
          timer: 2000,
        });
      
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("feedback", classItem?.feedback);
  }, [setValue]);

  return (
    <div>
      <form
        // encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl text-center my-4">Send feedback to Instructor </h2>
       <div className="">
       <textarea {...register('feedback',{required:true})} id="feedback" rows="3" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"></textarea>
       </div>
      

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 mt-4 ${
            loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600  "
          }  text-white font-semibold rounded-lg focus:outline-none`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3 ">
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

export default SendFeedback;
