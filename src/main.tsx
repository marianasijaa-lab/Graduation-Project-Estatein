import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store";
import Root from "./Root";
import { ThemeProvider } from "./Context/ThemeContext";
import { AuthProvider } from "./Context/AuthContext";
import { AuthGate } from "./components/auth/AuthGate";
import { AppToaster } from "./components/common/AppToaster";
import ProperityPage from "./Pages/Properties";
import HomePage from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Contact from "./Pages/Contact";
import { PropertyDetails } from "./Pages/PropertyDetails";
import { ServicesPage } from "./Pages/Services";
import { DashboardLayout } from "./components/Layout/DashboardLayout";
import { PropertiesManagement } from "./Pages/Dashboard/PropertiesManagement";
import { ValuesManagement } from "./Pages/Dashboard/ValuesManagement";
import { AchievementsManagement } from "./Pages/Dashboard/AchievementsManagement";
import { ClientsManagement } from "./Pages/Dashboard/ClientsManagement";
import { SplashScreen } from "./components/common/SplashScreen";
import { FAQManagement } from "./Pages/Dashboard/FAQManagement";
import { TestimonialsManagement } from "./Pages/Dashboard/TestimonialsManagement";
import { UnlockPropertyValueManagement } from "./Pages/Dashboard/UnlockPropertyValueManagement";
import { EffortlessPropertyManagementManagement } from "./Pages/Dashboard/EffortlessPropertyManagementManagement";
import { SmartInvestmentsManagement } from "./Pages/Dashboard/SmartInvestmentsManagement";
import { OfficesManagement } from "./Pages/Dashboard/OfficesManagement";
import { InquiriesManagement } from "./Pages/Dashboard/InquiriesManagement";
import { ContactInfoManagement } from "./Pages/Dashboard/ContactInfoManagement";
import { SubscribersManagement } from "./Pages/Dashboard/SubscribersManagement";

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
    element: (
      <AuthGate>
        <DashboardLayout />
      </AuthGate>
    ),
    children: [
      { index: true, element: <Navigate to="properties" replace /> },
      { path: "properties", element: <PropertiesManagement /> },
      { path: "values", element: <ValuesManagement /> },
      { path: "achievements", element: <AchievementsManagement /> },
      { path: "clients", element: <ClientsManagement /> },
      { path: "faqs", element: <FAQManagement /> },
      { path: "testimonials", element: <TestimonialsManagement /> },
      { path: "unlock-property-value", element: <UnlockPropertyValueManagement /> },
      { path: "effortless-property-management", element: <EffortlessPropertyManagementManagement /> },
      { path: "smart-investments", element: <SmartInvestmentsManagement /> },
      { path: "offices", element: <OfficesManagement /> },
      { path: "inquiries", element: <InquiriesManagement /> },
      { path: "contact-info", element: <ContactInfoManagement /> },
      { path: "subscribers", element: <SubscribersManagement /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <SplashScreen>
            <RouterProvider router={router} />
          </SplashScreen>
          <AppToaster />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
