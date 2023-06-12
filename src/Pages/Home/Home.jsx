import SectionTitle from "../../Share/SectionTitle/SectionTitle";
import PopularClasses from "./PopularClasses  PopularClasses/PopularClasses  PopularClasses";
import Slider from "./Slider/Slider";

const Home = () => {
  return (
    <div className="container mx-auto overflow-x-auto">
      <Slider />
      <SectionTitle
        title={"Popular Classes"}
        subtitle={
          "This popular Class is based on the most of student purchase this class "
        }
      />
      <PopularClasses />
      <SectionTitle
        title={"Popular Instructors"}
        subtitle={
          "This popular Instructors is based on the most of student purchase this class with this instructors "
        }
      />
    </div>
  );
};

export default Home;
