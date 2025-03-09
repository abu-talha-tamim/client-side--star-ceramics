import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import testimonials from "../../../Data/Testimonials.json";
import Titles from "../../../Components/Title/Titles";

const Testimonials = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-100 to-white">
      <Titles heading={"Testimonials"} />
      <div className="w-full flex justify-center items-center py-10 px-4">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1} 
          breakpoints={{
            640: { slidesPerView: 1 }, 
            768: { slidesPerView: 2 }, 
            1024: { slidesPerView: 3 }, 
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000, 
            disableOnInteraction: false,
          }}
          speed={700} 
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="w-full max-w-6xl"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="p-5">
              <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center w-full max-w-sm mx-auto transition transform hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex justify-center mb-4">
                  <div className="rating">
                    <input
                      type="radio"
                      name={`rating-${testimonial.id}`}
                      className="mask mask-star-2 bg-yellow-400"
                      aria-label="1 star"
                    />
                    <input
                      type="radio"
                      name={`rating-${testimonial.id}`}
                      className="mask mask-star-2 bg-yellow-400"
                      aria-label="2 star"
                      defaultChecked
                    />
                    <input
                      type="radio"
                      name={`rating-${testimonial.id}`}
                      className="mask mask-star-2 bg-yellow-400"
                      aria-label="3 star"
                    />
                    <input
                      type="radio"
                      name={`rating-${testimonial.id}`}
                      className="mask mask-star-2 bg-yellow-400"
                      aria-label="4 star"
                    />
                    <input
                      type="radio"
                      name={`rating-${testimonial.id}`}
                      className="mask mask-star-2 bg-yellow-400"
                      aria-label="5 star"
                    />
                  </div>
                </div>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full object-cover border-2 border-gray-300 mb-4"
                />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {testimonial.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mt-1">
                  {testimonial.designation}
                </p>
                <p className="mt-4 text-gray-700 text-xs sm:text-sm">
                  {testimonial.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
