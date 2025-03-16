import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash, FaEdit } from "react-icons/fa";

const Employee = () => {
  const [task, setTask] = useState("Sales");
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState(new Date());
  const [workLogs, setWorkLogs] = useState([]);
  const [editLog, setEditLog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkLogs();
  }, []);

  const fetchWorkLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employWork");
      setWorkLogs(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      task,
      hours,
      date: date.toISOString(), 
    };

    if (editLog) {
      await handleUpdate(editLog._id, newEntry);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/employWork",
          newEntry
        );
        setWorkLogs([response.data, ...workLogs]);
      } catch (error) {
        console.error("Error adding work log:", error);
      }
    }

    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;

    try {
      await axios.delete(`http://localhost:5000/employWork/${id}`);
      setWorkLogs(workLogs.filter((log) => log._id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleEdit = (log) => {
    const parsedDate = log.date ? new Date(log.date) : null;

    if (!parsedDate || isNaN(parsedDate.getTime())) {
      alert("Invalid date value");
      return;
    }

    setTask(log.task);
    setHours(log.hours);
    setDate(parsedDate); // Set the date in the correct format
    setEditLog(log);
    setShowModal(true); // Open the modal
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/employWork/${id}`, updatedData);
      const updatedLogs = workLogs.map((log) =>
        log._id === id ? { ...log, ...updatedData } : log
      );
      setWorkLogs(updatedLogs);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating work log:", error);
    }
  };

  const resetForm = () => {
    setTask("Sales");
    setHours(0);
    setDate(new Date());
    setEditLog(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 mx-auto text-center border-amber-100 border-y-4 py-4 lg:w-8/12 text-gray-400">
        Employee Work Tracker
      </h2>

      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
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

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          {editLog ? "Update" : "Submit"}
        </button>
      </form>

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
          {workLogs.map((log) => (
            <tr
              key={log._id}
              className="text-center bg-white hover:bg-gray-100 transition duration-200"
            >
              <td className="p-4 border-b border-gray-200">{log.task}</td>
              <td className="p-4 border-b border-gray-200">{log.hours}</td>
              <td className="p-4 border-b border-gray-200">{log.date}</td>
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
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={resetForm}
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
