import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();
  console.log(location);

  // Combine the conditions for 'login' and 'register' paths
  const onFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");

  return (
    <div>
      <Navbar />
      <Outlet />
      {!onFooter && <Footer />}{" "}
      
    </div>
  );
};

export default Main;
