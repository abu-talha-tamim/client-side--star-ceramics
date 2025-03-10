import * as React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router";
import {  HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <div className="max-w-screen w-6xl mx-auto">
        <RouterProvider router={router} />
      </div>
    </HelmetProvider>
  </React.StrictMode>
);
