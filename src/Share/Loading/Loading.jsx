import Lottie from "lottie-react";
import animationData from "../../assets/lottiefile/loader.json";
import animationLogoData from "../../assets/lottiefile/logo.json";
const Loading = () => {
    return (
        <div className="flex items-center justify-center relative" >
          <Lottie
            animationData={animationData}
            className="w-full rounded-xl  shadow-lg"
          /> 
          <Lottie
            animationData={animationLogoData}
            className=" rounded-xl absolute animate-spin"
          /> 
        </div>
    );
};

export default Loading;