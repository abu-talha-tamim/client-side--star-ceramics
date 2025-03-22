import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Dashboard from "../Layout/Dashboard";

import Employee from "../pages/Dashboard/Employee/Employee";
import Admin from "../pages/Dashboard/Admin/Admin";

import Finance from "../pages/Dashboard/Finance/Finance";
import Reports from "../pages/Dashboard/Reports/Reports";
import Hr from "../pages/Dashboard/HR/Hr";
import AllUser from "../pages/Dashboard/Users/AllUser";
import Cart from "../pages/Dashboard/Cart/Cart";

import PrivateRoute from "./PrivateRoute";
import Progress from "../pages/Dashboard/HR/Progress";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      // admin
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "users",
        element: <AllUser />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "hr",
        element: <Hr />,
      },
      {
        path: "progress",
        element: <Progress/>,
      },

      {
        path: "finance",
        element: <Finance />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
    ],
  },
]);
