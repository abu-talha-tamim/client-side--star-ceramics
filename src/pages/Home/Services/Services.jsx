import Titles from "../../../Components/Title/Titles";
import services from "../../../Data/Services.json";
import {
  FaTasks,
  FaMoneyBillWave,
  FaClock,
  FaFileContract,
  FaChartLine,
  FaComments,
} from "react-icons/fa";

const iconMap = {
  FaTasks: <FaTasks className="text-blue-600 text-4xl" />,
  FaMoneyBillWave: <FaMoneyBillWave className="text-green-600 text-4xl" />,
  FaClock: <FaClock className="text-yellow-500 text-4xl" />,
  FaFileContract: <FaFileContract className="text-purple-600 text-4xl" />,
  FaChartLine: <FaChartLine className="text-red-500 text-4xl" />,
  FaComments: <FaComments className="text-indigo-500 text-4xl" />,
};

const Services = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-100 to-white">
      <Titles subHeading="services" heading="Our Services" />
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {iconMap[service.icon]}
              <h3 className="mt-6 text-2xl font-bold text-gray-700">
                {service.title}
              </h3>
              <p className="mt-4 text-gray-600">{service.description}</p>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
