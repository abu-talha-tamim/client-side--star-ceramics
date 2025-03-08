import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../assets/Banner/pexels-heyho-6394687.jpg";
import img2 from "../../assets/Banner/pexels-karolina-grabowska-4977410.jpg";
import img3 from "../../assets/Banner/C3.jpg";
import img4 from "../../assets/Banner/pexels-fauxels-3184357.jpg";

const Banner = () => {
  return (
    <div className="w-full  mx-auto mt-2">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000} 
        transitionTime={700} 
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src={img1} className="object-cover h-1/4 " alt="Banner 1" />
          <p className="legend bg-black bg-opacity-50  rounded text-white">
            Explore the Best
          </p>
        </div>
        <div>
          <img src={img2} className="object-cover h-1/4 " alt="Banner 2" />
          <p className="legend bg-black bg-opacity-50 p-2 rounded text-white">
            Quality Products
          </p>
        </div>
        <div>
          <img src={img3} className="object-cover h-1/4 " alt="Banner 3" />
          <p className="legend bg-black bg-opacity-50  rounded text-white">
            Great Deals
          </p>
        </div>
        <div>
          <img src={img4} className="object-cover h-1/4" alt="Banner 4" />
          <p className="legend bg-black bg-opacity-50 rounded text-white">
            Shop with Us
          </p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
