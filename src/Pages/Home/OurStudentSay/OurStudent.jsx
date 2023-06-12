import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { A11y, Autoplay, FreeMode, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


const feedback = [
  {
    student_id: 1,
    feedback:
      "The instructor explained the concepts clearly and made the class engaging. They provided real-life examples that helped me understand the material better. The course structure was well-designed, allowing for a gradual progression of difficulty. The assignments were challenging but manageable. The feedback given on my work was detailed and constructive. Overall, I'm extremely satisfied with the quality of teaching and the learning experience.",
    rating: 4.5,
  },
  {
    student_id: 2,
    feedback:
      "I found the course material to be comprehensive and well-organized. The lectures were informative, and the supporting resources were helpful in furthering my understanding. The practical exercises and hands-on projects were particularly beneficial, as they allowed me to apply what I learned. The instructor was responsive to questions and provided timely clarifications. I would highly recommend this course to anyone interested in the subject matter.",
    rating: 4.2,
  },
  {
    student_id: 3,
    feedback:
      "I had a great learning experience with this course. The instructor's teaching style was engaging, and they encouraged active participation. The course content was relevant and up-to-date, covering both theoretical concepts and practical applications. The assignments challenged me to think critically and problem-solve. The instructor's availability for doubts and feedback was commendable. I feel more confident in my abilities after completing this course.",
    rating: 4.7,
  },
  {
    student_id: 4,
    feedback:
      "I would like to express my gratitude to the instructor for their exceptional teaching. They were knowledgeable, approachable, and always willing to help. The course structure was well-paced, and the materials provided were informative. The interactive discussions and group activities enhanced my learning experience. The instructor's feedback on my assignments was detailed and guided me towards improvement. I highly recommend this course to anyone looking to expand their knowledge.",
    rating: 4.8,
  },
  {
    student_id: 5,
    feedback:
      "I had a positive experience in this course. The instructor created a supportive and inclusive learning environment. They fostered a sense of collaboration among students, which made the class engaging. The course content was relevant and practical, and the real-life examples shared were insightful. I appreciated the opportunities for hands-on learning and the instructor's prompt response to queries. Overall, it was an enriching experience, and I would definitely recommend this course.",
    rating: 4.6,
  },
  {
    student_id: 6,
    feedback:
      "This course challenged me to think critically and pushed me out of my comfort zone. The instructor's teaching style was effective, and they encouraged active participation. The course material was well-structured and presented in an engaging manner. The assignments and projects helped me apply what I learned in a practical context. The instructor's guidance and timely feedback were invaluable. I feel more confident in my skills after completing this course.",
    rating: 4.3,
  },
  {
    student_id: 7,
    feedback:
      "I thoroughly enjoyed this course. The instructor's expertise in the subject matter was evident, and they shared real-world examples that made the content relatable. The course material was up-to-date and aligned with industry standards. The assignments and quizzes were thought-provoking and challenged me to deepen my understanding. The instructor was approachable and provided prompt support whenever needed. I highly recommend this course to anyone interested in the field.",
    rating: 4.9,
  },
  {
    student_id: 8,
    feedback:
      "I had a fantastic learning experience with this course. The instructor's passion for the subject was contagious, and it made the classes engaging. The course content was comprehensive and well-structured, covering all the essential topics. The assignments and projects were practical, allowing me to apply my knowledge. The instructor's feedback was valuable and helped me improve. I would definitely enroll in another course taught by them.",
    rating: 4.5,
  },
];

const OurStudent = () => {
  return (
    <div>
      <>
      <Swiper
      
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
              {feedback.map((feed, index) => (
                <SwiperSlide
                  key={feed.student_id}
                  
                  tag="div"
                >
                  <div className="shadow-lg border rounded-md p-4">
                  {feed.feedback}  
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
      </>
    </div>
  );
};

export default OurStudent;
