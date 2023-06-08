import Lottie from "lottie-react";
import animationData from "../../assets/lottiefile/loader.json";
const Loading = () => {
  return (
    <div className="flex items-center justify-center relative">
      <Lottie
        animationData={animationData}
        className="max-w-sm mx-auto rounded-xl  shadow-lg"
      />
    </div>
  );
};

export default Loading;
