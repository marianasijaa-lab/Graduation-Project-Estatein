import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Root";
import { ThemeProvider } from "./Context/ThemeContext";
import ProperityPage from "./Pages/ProperityPage";
import { Home } from "lucide-react";



<<<<<<< HEAD
=======
import { HomePage } from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import { PropertyDetails } from "./Pages/PropertyDetails";
>>>>>>> 46cf8271d8dd0b5cbfddd560ef3ad40951e84a2d

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "",
        index: true,
<<<<<<< HEAD
        element: <Home/>
        // element:<Home/> home page to be done 
      // صحفة الهوم وقت بتنعمل بتنحط هون
=======
        element: <HomePage />
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/property-details",
        element: <PropertyDetails />,
>>>>>>> 46cf8271d8dd0b5cbfddd560ef3ad40951e84a2d
      },
      {
        path: "properties",
        element: <ProperityPage />,
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
