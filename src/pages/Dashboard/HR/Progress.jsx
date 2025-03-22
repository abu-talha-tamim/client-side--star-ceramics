import { useState, useEffect } from "react";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Progress = () => {
  const axiosPublic = useAxiosPublic();
  const [workLogs, setWorkLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    fetchWorkLogs();
  }, []);

  const fetchWorkLogs = async () => {
    try {
      const response = await axiosPublic.get("/employWork");
      setWorkLogs(response.data.reverse());
      setWorkLogs(response.data);
      setFilteredLogs(response.data);

      // Extract unique employee emails for dropdown
      const uniqueEmployees = [
        ...new Set(response.data.map((log) => log.employeeEmail)),
      ];
      setEmployees(uniqueEmployees);
    } catch (error) {
      console.error("Error fetching work logs:", error);
    }
  };

  // Filter work logs based on selected employee & month
  useEffect(() => {
    let filtered = workLogs;

    if (selectedEmployee) {
      filtered = filtered.filter(
        (log) => log.employeeEmail === selectedEmployee
      );
    }

    if (selectedMonth) {
      const selectedMonthNumber = selectedMonth.getMonth(); // 0 for Jan, 1 for Feb, etc.
      filtered = filtered.filter(
        (log) => new Date(log.date).getMonth() === selectedMonthNumber
      );
    }

    setFilteredLogs(filtered);
  }, [selectedEmployee, selectedMonth, workLogs]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center border-b-4 py-4 text-gray-500">
        Employee Work Progress
      </h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 my-6 justify-center">
        {/* Employee Filter */}
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="">All Employees</option>
          {employees.map((employee) => (
            <option key={employee} value={employee}>
              {employee}
            </option>
          ))}
        </select>

        {/* Month Filter */}
        <DatePicker
          selected={selectedMonth}
          onChange={setSelectedMonth}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="border p-2 rounded-md"
        />
      </div>

      {/* Work Logs Table */}
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
            <th className="p-4">Employee</th>
            <th className="p-4">Task</th>
            <th className="p-4">Hours Worked</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log) => (
            <tr
              key={log._id}
              className="text-center bg-white hover:bg-gray-100 transition duration-200"
            >
              <td className="p-4 border-b border-gray-200">
                {log.employeeEmail}
              </td>
              <td className="p-4 border-b border-gray-200">{log.task}</td>
              <td className="p-4 border-b border-gray-200">{log.hours}</td>
              <td className="p-4 border-b border-gray-200">
                {new Date(log.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredLogs.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No records found</p>
      )}
    </div>
  );
};

export default Progress;
