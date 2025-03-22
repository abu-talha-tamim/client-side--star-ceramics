import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import useAxiosPublic from "../../../hook/useAxiosPublic";
import useAuth from "../../../hook/useAuth";


const Employee = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [task, setTask] = useState("Sales");
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState(new Date());
  const [workLogs, setWorkLogs] = useState([]);
  const [editLog, setEditLog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch only work logs for the logged-in employee and show only the most recent entry
  const fetchWorkLogs = async () => {
    try {
      const response = await axiosPublic.get("/employWork");
      // Filter logs by employee email (if stored)
      const myLogs = response.data.filter(
        (log) => log.employeeEmail === user.email
      );
      // Sort descending by date (newest first)
      myLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
      // Keep only the most recent work log
      setWorkLogs(myLogs.slice(0, 1));
    } catch (error) {
      console.error("Error fetching work logs:", error);
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetchWorkLogs();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newEntry = {
      task,
      hours,
      date: date.toISOString(),
      employeeEmail: user.email,
    };

    try {
      if (editLog) {
        await axiosPublic.put(`/employWork/${editLog._id}`, newEntry);
        setShowModal(false);
      } else {
        await axiosPublic.post("/employWork", newEntry);
      }
      await fetchWorkLogs();
      // Clear form fields
      setTask("Sales");
      setHours(0);
      setDate(new Date());
      setEditLog(null);
    } catch (error) {
      console.error(
        editLog ? "Error updating work log:" : "Error adding work log:",
        error
      );
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      await axiosPublic.delete(`/employWork/${id}`);
      await fetchWorkLogs();
    } catch (error) {
      console.error("Error deleting work log:", error);
    }
  };

  const handleEdit = (log) => {
    const parsedDate = log.date ? new Date(log.date) : new Date();
    if (isNaN(parsedDate.getTime())) {
      alert("Invalid date value");
      return;
    }
    setTask(log.task);
    setHours(log.hours);
    setDate(parsedDate);
    setEditLog(log);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center border-y-4 py-4 text-gray-400">
        Employee Work Tracker
      </h2>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex gap-4 mb-6 items-center">
        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Content">Content</option>
          <option value="Paper-work">Paper-work</option>
        </select>

        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="border p-2 rounded-md"
          placeholder="Hours Worked"
          required
        />

        <DatePicker selected={date} onChange={setDate} className="border p-2" />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 text-white p-2 rounded-md ${
            isSubmitting && "opacity-50 cursor-not-allowed"
          }`}
        >
          {editLog ? "Update" : "Submit"}
        </button>
      </form>

      {/* Work Logs Table - Only the most recent entry */}
      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-gray-800 to-gray-600 text-white">
            <th className="p-4">Task</th>
            <th className="p-4">Hours Worked</th>
            <th className="p-4">Date</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workLogs.map((log, index) => (
            <tr
              key={log._id || index}
              className="text-center bg-white hover:bg-gray-100 transition duration-200"
            >
              <td className="p-4 border-b border-gray-200">{log.task}</td>
              <td className="p-4 border-b border-gray-200">{log.hours}</td>
              <td className="p-4 border-b border-gray-200">
                {new Date(log.date).toLocaleDateString()}
              </td>
              <td className="p-4 border-b border-gray-200 flex justify-center gap-4">
                <button
                  onClick={() => handleEdit(log)}
                  className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-100"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(log._id)}
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100"
                >
                  <FaTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Work Log */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Work Log</h3>
            <form onSubmit={handleSubmit}>
              <select
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2 rounded-md w-full mb-4"
              >
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Content">Content</option>
                <option value="Paper-work">Paper-work</option>
              </select>

              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="border p-2 rounded-md w-full mb-4"
                placeholder="Hours Worked"
                required
              />

              <DatePicker
                selected={date}
                onChange={setDate}
                className="border p-2 w-full mb-4"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-green-500 text-white p-2 rounded-md ${
                    isSubmitting && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
