import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Root";
import { ThemeProvider } from "./Context/ThemeContext";

import { HomePage } from "./Pages/Home";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage/>
        // element:<Home/> home page to be done 
      // صحفة الهوم وقت بتنعمل بتنحط هون
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
