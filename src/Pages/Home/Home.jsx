import SectionTitle from "../../Share/SectionTitle/SectionTitle";
import OurStudent from "./OurStudentSay/OurStudent";
import PopularClasses from "./PopularClasses  PopularClasses/PopularClasses  PopularClasses";
import PopularInstructor from "./PopularInstructor/PopularInstructor";
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
      <PopularInstructor />

      <SectionTitle
        title={"Our Students Says"}
        subtitle={
          "Her is our student feedback about our classes and instructors"
        }
      />
      <OurStudent />
    </div>
  );
};

export default Home;
