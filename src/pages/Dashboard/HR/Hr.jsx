import { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import Swal from "sweetalert2";

const Hr = () => {
  const axiosPublic = useAxiosPublic();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [payMonth, setPayMonth] = useState("");
  const [payYear, setPayYear] = useState("");
  const [showPayModal, setShowPayModal] = useState(false);

  // Fetch all employees from backend (GET /employees)
  const fetchEmployees = async () => {
    try {
      const res = await axiosPublic.get("/employees");
      setEmployees(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Toggle verified status for an employee (PUT /employees/:id/verify)
  const toggleVerification = async (id) => {
    try {
      await axiosPublic.put(`/employees/${id}/verify`);
      Swal.fire("Success", "Employee verification status updated.", "success");
      fetchEmployees();
    } catch (error) {
      console.error("Error toggling verification:", error);
      Swal.fire("Error", "Failed to update verification status.", "error");
    }
  };

  // Open Pay Modal (only for verified employees)
  const openPayModal = (employee) => {
    setSelectedEmployee(employee);
    setShowPayModal(true);
  };

  // Handle Payment Request (POST /payroll)
  const handlePay = async () => {
    if (!payMonth || !payYear) {
      Swal.fire("Warning", "Please enter Month and Year", "warning");
      return;
    }
    try {
      await axiosPublic.post("/payroll", {
        employeeId: selectedEmployee._id,
        salary: selectedEmployee.salary,
        month: payMonth,
        year: payYear,
      });
      Swal.fire("Success", "Payment request created.", "success");
      setShowPayModal(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire("Error", "Failed to process payment.", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center text-xl">Loading employees...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Employee List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Verified</th>
              <th className="py-2 px-4 text-left">Bank Account</th>
              <th className="py-2 px-4 text-left">Salary</th>
              <th className="py-2 px-4 text-center">Pay</th>
              <th className="py-2 px-4 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp._id || index} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{emp.name}</td>
                <td className="py-2 px-4">{emp.email}</td>
                <td className="py-2 px-4">
                  <button onClick={() => toggleVerification(emp._id)}>
                    {emp.isVerified ? (
                      <FaCheckCircle className="text-green-600" size={20} />
                    ) : (
                      <FaTimesCircle className="text-red-600" size={20} />
                    )}
                  </button>
                </td>
                <td className="py-2 px-4">{emp.bank_account_no}</td>
                <td className="py-2 px-4">${emp.salary}</td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => openPayModal(emp)}
                    disabled={!emp.isVerified}
                    className={`px-3 py-1 rounded-md ${
                      emp.isVerified
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-400 cursor-not-allowed text-white"
                    }`}
                  >
                    Pay
                  </button>
                </td>
                <td className="py-2 px-4 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                    <FaInfoCircle size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Payment */}
      {showPayModal && (
        <Modal
          isOpen={showPayModal}
          onRequestClose={() => setShowPayModal(false)}
          className="bg-white p-6 rounded-md shadow-lg max-w-md mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h3 className="text-xl font-semibold mb-4">
            Pay {selectedEmployee?.name}
          </h3>
          <p className="mb-2">
            Salary:{" "}
            <span className="font-bold">${selectedEmployee?.salary}</span>
          </p>
          <div className="flex flex-col gap-3 mb-4">
            <input
              type="text"
              placeholder="Month (e.g., March)"
              value={payMonth}
              onChange={(e) => setPayMonth(e.target.value)}
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Year (e.g., 2025)"
              value={payYear}
              onChange={(e) => setPayYear(e.target.value)}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handlePay}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Pay
            </button>
            <button
              onClick={() => setShowPayModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Hr;
