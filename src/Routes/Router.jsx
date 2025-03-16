import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import Employee from "../pages/Dashboard/Employee/Employee";
import Admin from "../pages/Dashboard/Admin/Admin";
import Hr from "../pages/Dashboard/HR/hr";
import Finance from "../pages/Dashboard/Finance/Finance";
import Reports from "../pages/Dashboard/Reports/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: "/login",
          element: <Login/>
        },


        {
          path: "/register",
          element: <Register/>,
        }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard/>,
    children: [
      {
        path: 'cart',
        element: <Cart/>,
      },
      {
        path: 'employee',
        element: <Employee/>,
      },
      {
        path: 'hr',
        element: <Hr/>,
      },
      {
        path: 'admin',
        element: <Admin/>,
      },
      {
        path: 'finance',
        element: <Finance/>,
      },
      {
        path: 'reports',
        element: <Reports/>,
      },
    ]
  }
]);
