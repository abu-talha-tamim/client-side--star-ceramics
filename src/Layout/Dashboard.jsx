import React from "react";
import {
  FaHome,
  FaUsers,
  FaUserShield,
  FaShoppingCart,
  FaFileInvoiceDollar,
  FaChartLine,
  FaCogs,
  FaUser,
  FaMailBulk,
  FaListUl,
  FaBars,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hook/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  return (
    <div className="flex min-h-screen bg-gray-200">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 text-white min-h-screen p-5 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 uppercase tracking-wide">
          Dashboard
        </h2>

        <ul className="space-y-3">
          {isAdmin ? (
            <>
              {/* Admin Section */}
              <li>
                <NavLink
                  to="/dashboard/admin"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                      isActive ? "bg-blue-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <FaUserShield /> All-Employee
                </NavLink>
              </li>
              {/* Finance Section */}
              <li>
                <NavLink
                  to="/dashboard/finance"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                      isActive ? "bg-blue-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <FaFileInvoiceDollar /> Admin-payroll
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                      isActive ? "bg-blue-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <FaUser /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {" "}
              {/* HR Section */}
              <li>
                <NavLink
                  to="/dashboard/hr"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                      isActive ? "bg-blue-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <FaListUl /> Employee-list
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/progress"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                      isActive ? "bg-blue-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <FaBars /> progress
                </NavLink>
              </li>
              {/* Reports Section */}
              <li>
                <NavLink
                  to="/dashboard/reports"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                      isActive ? "bg-blue-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <FaChartLine /> reports
                </NavLink>
              </li>
              {/* Employee Section */}
              <li>
                <NavLink
                  to="/dashboard/employee"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                      isActive ? "bg-blue-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  <FaUsers /> Employee work-sheet
                </NavLink>
              </li>
            </>
          )}
          {/* Divider before last three sections */}
          <div className="border-t border-gray-700 my-3"></div>

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
          <li>
            <NavLink
              to="/dashboard/contact"
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition duration-300 ${
                  isActive ? "bg-blue-700" : "hover:bg-gray-700"
                }`
              }
            >
              <FaMailBulk /> Contact Us
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
