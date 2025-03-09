import Titles from "../../../Components/Title/Titles";

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen bg-fixed"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/6x32ppZ/C3.jpg)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">STER -T CERAMIC</h1>
            <p className="mb-5">
              Our ceramic tiles radiate timeless elegance and earthy texture,
              meticulously crafted from natural clay to form artisanal
              masterpieces that seamlessly merge rustic charm with modern
              sophistication, transforming interiors with allure.
            </p>
          </div>
        </div>
      </div>
      <Titles
      heading={"Industry"}
      />
      <figure className="diff aspect-16/9 mb-5" tabIndex={0}>
        <div className="diff-item-1" role="img">
          <div className="bg-primary text-primary-content grid place-content-center text-9xl font-black">
           PRODUCTION
          </div>
        </div>
        <div className="diff-item-2" role="img" tabIndex={0}>
          <div className="bg-base-200 grid place-content-center text-9xl font-black">
          PRODUCTION
          </div>
        </div>
        <div className="diff-resizer"></div>
      </figure>
    </div>
  );
};

export default Hero;
