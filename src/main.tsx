import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Root";
import { ThemeProvider } from "./Context/ThemeContext";

import { HomePage } from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import { PropertyDetails } from "./Pages/PropertyDetails";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/property-details",
        element: <PropertyDetails />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
