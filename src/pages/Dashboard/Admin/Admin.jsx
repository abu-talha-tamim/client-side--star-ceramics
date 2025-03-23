import { useState, useEffect } from "react";

import Swal from "sweetalert2";
import useAxios from "../../../hook/useAxious";

const Admin = () => {
  const axiosSecure = useAxios();
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all verified employees
  const fetchEmployees = async () => {
    try {
      const res = await axiosSecure.get("/employees");
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

  // Make an employee HR
  const handleMakeHR = async (id) => {
    try {
      await axiosSecure.put(`/employees/${id}/make-hr`);
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === id ? { ...emp, role: "HR" } : emp))
      );
      Swal.fire("Success", "Employee promoted to HR", "success");
    } catch (error) {
      console.error("Error making HR:", error);
      Swal.fire("Error", "Failed to promote employee", "error");
    }
  };

  // Fire an employee or HR
  const handleFire = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This user won't be able to log in anymore!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, fire them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.put(`/employees/${id}/fire`);
          setEmployees((prev) =>
            prev.map((emp) =>
              emp._id === id ? { ...emp, isFired: true } : emp
            )
          );
          Swal.fire("Fired!", "The employee has been fired.", "success");
        } catch (error) {
          console.error("Error firing employee:", error);
          Swal.fire("Error", "Failed to fire employee", "error");
        }
      }
    });
  };

  // Adjust salary
  const handleSalaryChange = async (id, newSalary) => {
    try {
      await axiosSecure.put(`/employees/${id}/update-salary`, {
        salary: newSalary,
      });
      setEmployees((prev) =>
        prev.map((emp) =>
          emp._id === id ? { ...emp, salary: newSalary } : emp
        )
      );
      Swal.fire("Updated!", "Salary adjusted successfully", "success");
    } catch (error) {
      console.error("Error updating salary:", error);
      Swal.fire("Error", "Failed to update salary", "error");
    }
  };

  if (isLoading)
    return <p className="text-center text-xl">Loading employees...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Manage Employees</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Designation</th>
              <th className="py-2 px-4 text-left">Salary</th>
              <th className="py-2 px-4 text-center">Make HR</th>
              <th className="py-2 px-4 text-center">Fire</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4">{employee.name}</td>
                <td className="py-2 px-4">{employee.role}</td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={employee.salary}
                    onChange={(e) =>
                      handleSalaryChange(employee._id, e.target.value)
                    }
                    className="w-20 px-2 py-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 text-center">
                  {employee.role === "Employee" && (
                    <button
                      onClick={() => handleMakeHR(employee._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      Make HR
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 text-center">
                  {employee.isFired ? (
                    <span className="text-red-500 font-bold">Fired</span>
                  ) : (
                    <button
                      onClick={() => handleFire(employee._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Fire
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
