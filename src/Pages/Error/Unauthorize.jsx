import { useNavigate, useRouteError } from "react-router-dom";

import Lottie from "lottie-react";
import animationData from "../../assets/lottiefile/unauthoriz.json";

const Unauthorize = () => {
  
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">You are not Authorize to visit this page</h1>

        <p className="text-gray-600 mb-8"></p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Go back to Home
        </button>
      </div>
      <Lottie
        animationData={animationData}
        className="max-w-sm rounded-xl  shadow-lg"
      />
    </div>
  );
};

export default Unauthorize;
