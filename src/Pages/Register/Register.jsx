import { FaEye, FaEyeSlash } from "react-icons/fa";

import Lottie from "lottie-react";
import animationData from "../../assets/lottiefile/register.json";
import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utility/axiosInstance";
import GoogleLogin from "../../Share/GoogleLogin/GoogleLogin";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register:registerFirebase, loading, setLoading } = useAuth();
  const [error, setError] = useState("");
  const [toggleEye, setToggleEye] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const handleRegister = async (data) => {
    const { email, password, name, photoUrl } = data;
    // const email = e.target.email.value;
    // const password = e.target.password.value;
    // const name = e.target.name.value;
    // const photoUrl = e.target.photoUrl.value;
    // if user input is not valid
    try {
      const user = await registerFirebase(email, password, name, photoUrl);
      // console.log({email,password});
      console.log(user);
      const dbUserInfo = await axiosInstance.post("/users", {
        email: email.toLowerCase(),
        role: "student",
        name,
        photoUrl,
      });
      console.log({ dbUserInfo });
      navigate(location?.state?.from?.pathname || "/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log({ error: error.message });
    }
  };

  return (
    <>
      <div className="bg-[#E5E7EB]   flex flex-col lg:flex-row-reverse justify-center items-center py-8">
        <div className="w-full max-w-md lg:w-1/2">
          <div className=" shadow-lg  rounded-lg p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold mb-4">Register</h1>
              <p className="text-info font-bold">
                <span className="ms-1  text-red-600">*</span> Field is Required
              </p>
            </div>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-600 font-bold">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <sup className="ms-1 text-xl text-red-600">*</sup>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-600 font-bold">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="photoUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo URL
                </label>
                <input
                  type="text"
                  id="photoUrl"
                  {...register("photoUrl", {})}
                  className="w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password<sup className="ms-1 text-xl text-red-600">*</sup>
                </label>

                <input
                  type={toggleEye ? "text" : "password"}
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be less than 20 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/i,
                      message:
                        "Password must contain at least one letter, one digit, and one special character",
                    },
                  })}
                  className={`w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-600 font-bold">
                    {errors.password.message}
                  </p>
                )}

                <button
                  onClick={() => setToggleEye(!toggleEye)}
                  type="button"
                  className="absolute shadow-md top-11 px-2  right-4"
                >
                  {toggleEye ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                  <sup className="ms-1 text-xl text-red-600">*</sup>
                </label>

                <input
                  type={toggleEye ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  className={`w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 font-bold">
                    {errors.confirmPassword.message}
                  </p>
                )}
                <button
                  onClick={() => setToggleEye(!toggleEye)}
                  type="button"
                  className="absolute shadow-md top-11 px-2  right-4"
                >
                  {toggleEye ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* common error */}
              {error && <p className="text-red-600 font-bold">{error}</p>}
              {/* common error */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className={`text-white font-bold py-2 px-4 rounded ${
                    loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700  "
                  }`}
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
                    "Sign Up"
                  )}
                </button>
                <Link to="/auth/login" className="mt-4 text-blue-500">
                  {" "}
                  Already have an account? Login
                </Link>
              </div>
            </form>
            <div className="flex flex-col w-2/4 mx-auto border-opacity-50">
              <div className="divider my-2">OR</div>
              <GoogleLogin setError={setError} />
              {/* <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`text-white bg-gradient-to-br   font-bold py-2 px-4 btn btn-circle btn-outline ${
            loading
              ? "from-green-800 via-yellow-600 to-red-500"
              : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          }`}
        >
          <FaGoogle />
        </button>
      </div> */}
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full   lg:w-1/2 bg-gray-200 flex justify-center items-center">
          <Lottie animationData={animationData} className="rounded-xl" />
        </div>
      </div>
    </>
  );
};

export default Register;
