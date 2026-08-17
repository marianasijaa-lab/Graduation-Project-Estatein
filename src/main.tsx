import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "./Root";

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "",
        index: true,
        // element:<Home/> home page to be done 
      // صحفة الهوم وقت بتنعمل بتنحط هون
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
