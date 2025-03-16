import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Modal from "react-modal";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const Hr = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const { data: employees = [], refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });

  const toggleVerification = async (id) => {
    await axios.put(`http://localhost:5000/users/${id}/verify`);
    refetch();
  };

  const handlePay = async () => {
    await axios.post("http://localhost:5000/payroll", {
      employeeId: selectedEmployee._id,
      salary: selectedEmployee.salary,
      month,
      year,
    });
    setIsModalOpen(false);
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Employee Management</h1>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border p-3">Name</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Verified</th>
            <th className="border p-3">Bank Account</th>
            <th className="border p-3">Salary</th>
            <th className="border p-3">Pay</th>
            <th className="border p-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} className="text-center bg-gray-100">
              <td className="border p-3">{employee.name}</td>
              <td className="border p-3">{employee.email}</td>
              <td
                className="border p-3 cursor-pointer"
                onClick={() => toggleVerification(employee._id)}
              >
                {employee.isVerified ? (
                  <AiOutlineCheckCircle className="text-green-600 text-xl" />
                ) : (
                  <AiOutlineCloseCircle className="text-red-600 text-xl" />
                )}
              </td>
              <td className="border p-3">{employee.bankAccount}</td>
              <td className="border p-3">${employee.salary}</td>
              <td className="border p-3">
                <button
                  disabled={!employee.isVerified}
                  onClick={() => openModal(employee)}
                  className={`px-3 py-1 text-white rounded ${
                    employee.isVerified
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400"
                  }`}
                >
                  Pay
                </button>
              </td>
              <td className="border p-3">Details</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="bg-white p-5 rounded-md shadow-md max-w-md mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-xl font-bold mb-4">
            Payment for {selectedEmployee?.name}
          </h2>
          <input
            type="text"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            onClick={handlePay}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Confirm Payment
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Hr;
