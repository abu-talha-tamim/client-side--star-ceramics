import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../assets/Banner/pexels-heyho-6394687.jpg";
import img2 from "../../assets/Banner/pexels-karolina-grabowska-4977410.jpg";
import img3 from "../../assets/Banner/C3.jpg";
import img4 from "../../assets/Banner/pexels-fauxels-3184357.jpg";

const Banner = () => {
  const successMessages = [
    "Pioneering Innovation Since 1990",
    "Empowering Success Worldwide",
    "Transforming Ideas into Reality",
    "Leading the Market with Excellence",
  ];

  return (
    <div className="w-full mx-auto mt-2">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        transitionTime={700}
        showThumbs={false}
        showStatus={false}
      >
        {[img1, img2, img3, img4].map((image, index) => (
          <div
            key={index}
            className="relative w-full h-[50vh] md:h-[60vh] lg:h-[90vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
                {successMessages[index]}
              </h1>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
