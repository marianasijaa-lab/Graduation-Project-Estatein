import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import Root from "./Root";
import { ThemeProvider } from "./Context/ThemeContext";
import ProperityPage from "./Pages/Properties";
import HomePage from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import { PropertyDetails } from "./Pages/PropertyDetails";
import { ServicesPage } from "./Pages/Services";
<<<<<<< HEAD
=======
import { Provider } from "react-redux";
import { store } from "./store";
>>>>>>> cea23977333ac88dd980c41bfdf2e4e465fa5280
import { DashboardLayout } from "./components/Layout/DashboardLayout";
import { PropertiesManagement } from "./Pages/Dashboard/PropertiesManagement";
import { ValuesManagement } from "./Pages/Dashboard/ValuesManagement";
import { AchievementsManagement } from "./Pages/Dashboard/AchievementsManagement";
import { ClientsManagement } from "./Pages/Dashboard/ClientsManagement";
<<<<<<< HEAD
import { SplashScreen } from "./components/common/SplashScreen";

=======
import { FAQManagement } from "./Pages/Dashboard/FAQManagement";
import { TestimonialsManagement } from "./Pages/Dashboard/TestimonialsManagement";
import { Navigate } from "react-router";
>>>>>>> cea23977333ac88dd980c41bfdf2e4e465fa5280
const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/property-details/:id",
        element: <PropertyDetails />,
      },
      {
        path: "/properties",
        element: <ProperityPage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
<<<<<<< HEAD
      {
        index: true,
        element: <Navigate to="properties" replace />,
      },
      {
        path: "properties",
        element: <PropertiesManagement />,
      },
      {
        path: "values",
        element: <ValuesManagement />,
      },
      {
        path: "achievements",
        element: <AchievementsManagement />,
      },
      {
        path: "clients",
        element: <ClientsManagement />,
      },
=======
      { index: true, element: <Navigate to="properties" replace /> },
      { path: "properties",   element: <PropertiesManagement /> },
      { path: "values",       element: <ValuesManagement /> },
      { path: "achievements", element: <AchievementsManagement /> },
      { path: "clients",      element: <ClientsManagement /> },
      { path: "faqs",         element: <FAQManagement /> },
      { path: "testimonials", element: <TestimonialsManagement /> },
>>>>>>> cea23977333ac88dd980c41bfdf2e4e465fa5280
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <SplashScreen>
          <RouterProvider router={router} />
        </SplashScreen>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
