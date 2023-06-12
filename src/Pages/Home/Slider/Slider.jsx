import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { A11y, Autoplay, FreeMode, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRef, useState } from "react";

import { FaAngleLeft, FaAngleRight, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
const sliderInfo = [
  {
    title: "Embrace the melody within",
    image:'https://templatekit.jegtheme.com/musicy/wp-content/uploads/sites/121/2021/07/group-of-homeschooling-children-with-teacher-having-music-lesson-indoors-coronavirus-concept-1-1-e1626148006985.jpg',
    subtitle:
      "Unlock your musical potential and let your passion for music soar. With each note you play, you embark on a journey of self-expression and creativity. Whether you're strumming a guitar, tickling the ivories, or blowing into a saxophone, the power of music knows no bounds. It can transport you to different worlds, evoke emotions, and connect people from all walks of life. So, embrace the harmonious symphony that resides within you, and let the music be your guide as you explore the art of learning and mastering musical instruments. There's a whole world of melodies waiting to be discovered.",
  },
  {
    title: "Harmony awaits your touch",
    image:'https://th.bing.com/th/id/R.dfe55f97df649857641448ae429ecdca?rik=j6BJ3Xj987nxRA&pid=ImgRaw&r=0',
    subtitle:
      "Discover the magic of music and unlock a world of endless possibilities. As you learn to play a musical instrument, you'll embark on a transformative journey that goes beyond mere notes and melodies. Music has the power to inspire, heal, and uplift your soul. It allows you to communicate emotions that words alone cannot convey. So, let your fingers dance on the keys, your hands strum the strings, or your breath bring life to a flute. Embrace the harmonious symphony that lies within you, and let the beauty of music touch hearts and create a lasting impact on the world.",
  },
  {
    title: "Let the rhythm guide you",
    image:'https://th.bing.com/th/id/OIP.uP09vcrbExMeBbZ4VotWdgHaEc?pid=ImgDet&rs=1',
    subtitle:
      "Find your groove and keep going. Learning a musical instrument is a rhythmic dance between dedication, perseverance, and the pure joy of creating music. It's a journey that requires discipline and patience, but the rewards are immeasurable. With each beat, your skills grow, and your passion deepens. You become a part of something greater—a universal language that transcends borders and unites souls. So, let the rhythm guide your fingers, your heart, and your spirit. Embrace the power of music, and embark on a lifelong adventure filled with melodies, harmony, and self-discovery.",
  },
  {
    title: "Unleash your inner maestro",
    image:'https://th.bing.com/th/id/R.9b1d7c6ed82c8f87b179e2473bfb823d?rik=MlLrYVmP7lS9JA&riu=http%3a%2f%2fwww.shanschool.com%2fwp-content%2fuploads%2f2016%2f05%2fIMG_8397-3.jpg&ehk=QjUL7W6fdWJ3QjZy%2fzy4sLdc2qgcfEZYuyd7pzIMRXw%3d&risl=&pid=ImgRaw&r=0',
    subtitle:
      "Step into the limelight of your musical potential. Learning a musical instrument is more than just a hobby—it's an art form that allows you to express yourself in ways words cannot. Each time you pick up an instrument, you have the opportunity to create something beautiful and unique. Whether you're playing classical compositions or experimenting with improvisation, you become the conductor of your own symphony. So, let the notes resonate through your soul, and unleash your inner maestro. Embrace the challenges, the triumphs, and the joy that comes with mastering an instrument, and let your music leave an indelible mark on the world.",
  },
  {
    title: "Dare to play your own melody",
    image:'https://templatekit.jegtheme.com/musicy/wp-content/uploads/sites/121/2021/07/group-of-homeschooling-children-with-teacher-having-music-lesson-indoors-coronavirus-concept-1-2-e1626147997980.jpg',
    subtitle:
      "Embrace the freedom of musical expression and dare to play your own melody. Learning a musical instrument is not just about replicating what others have done; it's about finding your unique voice and adding your own flavor to the music. It's about exploring new sounds, experimenting with different techniques, and pushing the boundaries of creativity. In the realm of music, there are no limits or rules that confine you. So, let your imagination take flight, and fearlessly explore the vast possibilities that lie before you. Discover the joy of composing your own tunes, and let your musical journey be a testament to the power of individuality and self-expression.",
  },
  {
    title: "The symphony of growth and learning",
    image:'https://th.bing.com/th/id/OIP.UlBLu-k9CVqxM12Uw_vDNQHaEK?pid=ImgDet&rs=1',
    subtitle:
      "Embark on a journey of constant growth and learning as you delve into the world of musical instruments. Each practice session is an opportunity to improve, refine your skills, and reach new heights of musical excellence. It's not always an easy path, but the challenges you encounter along the way only make the rewards sweeter. Embrace the process, embrace the mistakes, and embrace the joy of progress. With every note you play, you become a better version of yourself, both as a musician and as a person. So, immerse yourself in the symphony of growth, and let the beauty of learning musical instruments shape you into a lifelong learner.",
  },
  {
    title: "Melodies that heal and inspire",
    image:'https://th.bing.com/th/id/OIF.rnLPt9hZcUH16OWqP6NLCQ?pid=ImgDet&rs=1',
    subtitle:
      "Discover the transformative power of music as you learn to play a musical instrument. Music has the remarkable ability to heal wounds, lift spirits, and inspire change. Through the act of creating melodies, you become an agent of positive transformation, spreading joy and hope to those around you. Whether you're playing for an audience or simply for your own soul, your music has the potential to touch hearts and bring people together. So, let the healing notes flow from your fingertips, and let the melodies you create be a force for good in the world. Embrace the gift of music, and let it be a guiding light in your journey of self-discovery and personal growth.",
  },
  {
    title: "Unlock the magic within",
    image:'https://th.bing.com/th/id/OIP.Xc8sTvqbj4t9DhrLm4-cggHaE8?pid=ImgDet&rs=1',
    subtitle:
      "Unleash the enchanting power of music as you embark on a journey of learning and mastery. With each chord progression, every delicate harmony, and every skillful technique, you unlock a world of magic and wonder. The beauty of music lies not only in the sound it produces, but in the emotions it evokes and the stories it tells. So, immerse yourself in the melodies that resonate with your soul, and let the magic of music transport you to realms beyond imagination. Embrace the instrument in your hands, and let it be the conduit through which you channel your deepest emotions and express the very essence of who you are.",
  },
  {
    title: "Melodies that transcend time",
    image:'https://media.istockphoto.com/photos/kids-teaching-to-play-instruments-in-music-school-picture-id945041734?k=6&m=945041734&s=170667a&w=0&h=pa3mGkjwMIJzfHBac9dyr4PMNApGhyWHuzOFUBN16M8=',
    subtitle:
      "Discover the timeless beauty of music and its ability to transcend the barriers of time and space. As you learn to play a musical instrument, you become a part of a rich tapestry that spans centuries, connecting you with musicians and composers from different eras and cultures. The melodies you play carry the echoes of history and the aspirations of countless artists who came before you. So, embrace the heritage of music, and let it inspire you to create melodies that will resonate with future generations. Through your dedication and passion, you become a custodian of the musical legacy, adding your own chapter to the ever-evolving story of music.",
  },
  {
    title: "Harmonize with the rhythm of life",
    image:'https://cdn.mos.cms.futurecdn.net/BVmPtcdjLJgdXZAASAMRvS-1200-80.jpg',
    subtitle:
      "Immerse yourself in the rhythmic symphony of life as you learn to play a musical instrument. Just as every beat and note in music forms a cohesive whole, every experience and moment in life harmonizes to create your unique journey. The discipline, focus, and perseverance required to master an instrument mirror the qualities needed to navigate the ups and downs of life. Through music, you learn to listen, adapt, and find balance. So, let the rhythm of your instrument be a guiding force as you navigate the rhythm of life. Embrace the harmony between music and existence, and let the melodies you create become a reflection of your journey.",
  },
];

const Slider = () => {
  const [currentSlider, setCurrentSlider] = useState(sliderInfo[0]);

  const swiper = useRef(null);
  const handleNextSlideClick = () => {
    // call swiper instance's slideNext() method
    swiper.current.swiper.slideNext();
  };
  const handlePrevSlideClick = () => {
    // call swiper instance's slidePrev() method
    // console.dir(swiper.current);
    swiper.current.swiper.slidePrev();
  };

  return (
    <div
      className={`relative rounded-lg w-full h-screen flex items-center justify-center -z-0 overflow-auto`}
    >
      {/* background image and overlay */}
      <div className="absolute w-full h-full left-0 top-0 z-0">
        <img src={currentSlider?.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute w-full h-full left-0 top-0 z-0 bg-black/75"></div>
      {/* background image and overlay */}

      <div className="md:ps-8 px-8 flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 relative z-10">
        <div className=" md:col-span-2 flex items-center">
          <div className="">
            <h1 className="text-3xl font-bold text-white">
              {currentSlider?.title}
            </h1>
            <p className="text-white mt-4 font-light">
              {currentSlider && currentSlider?.subtitle?.length > 150
                ? currentSlider?.subtitle?.split("").slice(0, 150).join("") +
                  " ..."
                : currentSlider?.subtitle}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-col md:col-span-4 w-full">
          <div>
            <Swiper
              onInit={(swiper) => {
                setCurrentSlider(sliderInfo[swiper.realIndex]);
              }}
              onSlideChange={(swiper) => {
                setCurrentSlider(sliderInfo[swiper.realIndex]);
              }}
              ref={swiper}
              modules={[Pagination,Autoplay, FreeMode, A11y]}
              spaceBetween={10}
              slidesPerView={1}
              freeMode={true}
              loop={true}
              
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
              centeredSlides={false}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                996: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {sliderInfo.map((slider, index) => (
                <SwiperSlide
                  key={slider?.title + index}
                  className="relative group"
                  tag="div"
                >
                  <div
                    className={`rounded-xl relative h-48 md:h-80 overflow-hidden border-2 transition-all duration-300`}
                  >
                    <img
                      src={slider?.image}
                      alt=""
                      className="w-full h-full object-cover absolute"
                    />
                    <div className="absolute w-full h-full bg-gradient-to-t from-black/80 to-transparent">
                      
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex items-center gap-4 mx-auto md:mx-0 mb-4 md:mt-4">
            <button
              className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-black hover:text-white hover:bg-orange-400 transition-all duration-300"
              onClick={handlePrevSlideClick}
            >
              <FaAngleLeft />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-black hover:text-white hover:bg-orange-400 transition-all duration-300"
              onClick={handleNextSlideClick}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
