import React from "react";
import {
  FaDesktop,
  FaHome,
  FaUsers,
  FaUserShield,
  FaShoppingCart,
  FaFileInvoiceDollar,
  FaChartLine,
  FaCogs,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white min-h-screen p-5 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 uppercase tracking-wide">
          Dashboard
        </h2>

        <ul className="space-y-3">
          {/* Home */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaHome /> Home
            </NavLink>
          </li>

          {/* Employee Section */}
          <h3 className="text-sm text-gray-400 uppercase">Employee</h3>
          <li>
            <NavLink
              to="/dashboard/employee"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaUsers /> Employee Panel
            </NavLink>
          </li>

          {/* HR Section */}
          <h3 className="text-sm text-gray-400 uppercase">HR</h3>
          <li>
            <NavLink
              to="/dashboard/hr"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaDesktop /> HR Dashboard
            </NavLink>
          </li>

          {/* Admin Section */}
          <h3 className="text-sm text-gray-400 uppercase">Admin</h3>
          <li>
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaUserShield /> Admin Panel
            </NavLink>
          </li>

          {/* Finance Section */}
          <h3 className="text-sm text-gray-400 uppercase">Finance</h3>
          <li>
            <NavLink
              to="/dashboard/finance"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaFileInvoiceDollar /> Finance Panel
            </NavLink>
          </li>

          {/* Divider before last three sections */}
          <div className="border-t border-gray-700 my-3"></div>

          {/* Reports Section */}
          <h3 className="text-sm text-gray-400 uppercase">Reports</h3>
          <li>
            <NavLink
              to="/dashboard/reports"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaChartLine /> Reports & Analytics
            </NavLink>
          </li>

          {/* Settings Section */}
          <h3 className="text-sm text-gray-400 uppercase">Settings</h3>
          <li>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaCogs /> Settings
            </NavLink>
          </li>

          {/* My Cart */}
          <h3 className="text-sm text-gray-400 uppercase">My Cart</h3>
          <li>
            <NavLink
              to="/dashboard/cart"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaShoppingCart /> My Cart
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white shadow-lg rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
