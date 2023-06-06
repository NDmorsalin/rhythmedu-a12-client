import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import Lottie from "lottie-react";
import animationData from "../../assets/lottiefile/login.json";
import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import validator from "../../utility/validator";


const Login = () => {
  const { login, loginWithGoogle, loading, setLoading } = useAuth();
  const [error, setError] = useState("");
  const [toggleEye, setToggleEye] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const useError = validator(email, password);
    
    if (useError) {
      setError(useError);
      return;
    }


    try {
      const user = await login(email, password);
      // console.log({email,password});
      console.log(user);
      navigate(location?.state?.from?.pathname || "/");
    } catch (error) {
      setError(error.code);
      setLoading(false);
      console.log({ error });
    }
  };

  // login with google
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const user = await loginWithGoogle();
      console.log(user);
      navigate(location?.state?.from?.pathname || "/");
    } catch (error) {
      console.log({ error });
      setLoading(false);
      setError(error.code);
    }
  };

  // console.log({ loading, error });
  return (
    <>
      <div className="bg-[#E5E7EB] lg:h-[calc(100vh-4.5rem)]  flex flex-col lg:flex-row-reverse justify-center items-center py-8">
        <div className="w-full max-w-md lg:w-1/2">
          <div className=" shadow-lg  rounded-lg p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold mb-4">Login</h1>
              <p className="text-blue-500 font-bold">
                <span className="ms-2 text-red-600">*</span> Field is Required
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email<sup className="ms-1 text-xl text-red-600">*</sup>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
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
                  required
                  className="w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => setToggleEye(!toggleEye)}
                  type="button"
                  className="absolute shadow-md top-1/2 px-2 translate-y-1/2 right-4"
                >
                  {toggleEye ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {error && <p className="text-red-600 font-bold">{error}</p>}
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
                    "Sign In"
                  )}
                </button>
                <Link to="/auth/register" className="mt-4 text-blue-500">
                  Don&apos;t have an account? Register
                </Link>
              </div>
            </form>
            <div className="flex flex-col w-2/4 mx-auto border-opacity-50">
              <div className="divider my-2">OR</div>
              <div className="flex items-center justify-center">
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
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full   lg:w-1/2 bg-gray-200 flex justify-center items-center">
          <Lottie
            animationData={animationData}
            className="h-[calc(100vh-4.5rem)]"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
