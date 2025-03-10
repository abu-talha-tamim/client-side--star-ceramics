import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";

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
]);
