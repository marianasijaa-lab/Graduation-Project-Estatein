import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Root";
import { ThemeProvider } from "./Context/ThemeContext";
import ProperityPage from "./Pages/ProperityPage";
import { Home } from "lucide-react";




const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "",
        index: true,
        element: <Home/>
        // element:<Home/> home page to be done 
      // صحفة الهوم وقت بتنعمل بتنحط هون
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
