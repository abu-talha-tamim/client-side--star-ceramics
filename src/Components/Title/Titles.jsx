

const Titles = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center lg:w-4/12 my-8">
      <p className="lg:text-yellow-800 mb-2 font-bold"> {subHeading} </p>
      <h2 className=" lg:text-4xl uppercase border-amber-100 border-y-4 py-4 font-bold text-gray-400 flex items-center justify-center gap-2">
        {heading} 
      </h2>
    </div>
  );
};

export default Titles;
