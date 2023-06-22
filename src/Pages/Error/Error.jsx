import { useNavigate, useRouteError } from "react-router-dom";

import Lottie from "lottie-react";
import animationData from "../../assets/lottiefile/error.json";


const Error404Page = () => {
  const {status,statusText} = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <Lottie animationData={animationData} className=" rounded-xl  shadow-lg" />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">{status}</h1>
        
        <p className="text-gray-600 mb-8">
         {statusText}.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Go to back
        </button>
      </div>
    </div>
  );
};

export default Error404Page;
