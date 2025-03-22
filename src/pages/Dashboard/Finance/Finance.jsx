import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import useAxios from "../../../hook/useAxious";

const Finance = () => {
  const axiosSecure = useAxios();
  const [payrolls, setPayrolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all payroll records from the backend
  const fetchPayrolls = async () => {
    try {
      const res = await axiosSecure.get("/payroll");
      // Assume records are already sorted by year and month on the backend
      setPayrolls(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching payroll records:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  // Handle payment execution for a payroll record.
  const handlePay = async (id) => {
    try {
      // Call the backend to process the payment. This should update the payroll record's paidAt field.
      const res = await axiosSecure.put(`/payroll/${id}/pay`);
      // Update local state to reflect the payment execution
      setPayrolls((prevPayrolls) =>
        prevPayrolls.map((record) =>
          record._id === id ? { ...record, paidAt: res.data.paidAt } : record
        )
      );
      Swal.fire("Success", "Payment executed successfully", "success");
    } catch (error) {
      console.error("Error executing payment:", error);
      Swal.fire("Error", "Failed to execute payment", "error");
    }
  };

  if (isLoading) {
    return <p className="text-center text-xl">Loading payroll records...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Employee Name</th>
              <th className="py-2 px-4 text-left">Salary</th>
              <th className="py-2 px-4 text-left">Month</th>
              <th className="py-2 px-4 text-left">Year</th>
              <th className="py-2 px-4 text-left">Payment Date</th>
              <th className="py-2 px-4 text-center">Pay</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((record, index) => (
              <tr
                key={record._id || index}
                className="border-b hover:bg-gray-100"
              >
                <td className="py-2 px-4">{record.employeeName || "N/A"}</td>
                <td className="py-2 px-4">${record.salary}</td>
                <td className="py-2 px-4">{record.month}</td>
                <td className="py-2 px-4">{record.year}</td>
                <td className="py-2 px-4">
                  {record.paidAt
                    ? new Date(record.paidAt).toLocaleDateString()
                    : ""}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handlePay(record._id)}
                    disabled={!record.paidAt}
                    className={`px-3 py-1 rounded-md ${
                      record.paidAt
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-yellow-500 hover:bg-yellow-600 text-white"
                    }`}
                  >
                    {record.paidAt ? "Paid" : "Pay"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
