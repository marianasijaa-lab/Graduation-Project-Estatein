import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
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
<<<<<<< HEAD
        element: <HomePage/>
        // element:<Home/> home page to be done 
      // صحفة الهوم وقت بتنعمل بتنحط هون
=======
        // element:<Home/> home page to be done
        // صحفة الهوم وقت بتنعمل بتنحط هون
>>>>>>> b908999fb7f8e1ab2bce71bf043885bb8adad4ba
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
