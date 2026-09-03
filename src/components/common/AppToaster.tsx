import { Toaster } from "react-hot-toast";
import { useTheme } from "../../Context/ThemeContext";

/**
 * App-wide toast host. Mounted once near the app root (see main.tsx).
 * Styling follows the site's dark-first palette (index.css tokens).
 */
export const AppToaster = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Toaster
      position="top-right"
      gutter={10}
      toastOptions={{
        duration: 3500,
        style: {
          background: isDark ? "#1A1A1A" : "#ffffff",
          color: isDark ? "#ffffff" : "#141414",
          border: `1px solid ${isDark ? "#262626" : "#e5e5e5"}`,
          borderRadius: "12px",
          fontFamily: "'Urbanist', sans-serif",
          fontSize: "14px",
          padding: "12px 16px",
          maxWidth: "380px",
          boxShadow: isDark
            ? "0 12px 32px rgba(0,0,0,0.45)"
            : "0 12px 32px rgba(0,0,0,0.12)",
        },
        success: {
          iconTheme: { primary: "#22c55e", secondary: isDark ? "#1A1A1A" : "#ffffff" },
        },
        error: {
          duration: 6000,
          iconTheme: { primary: "#f43f5e", secondary: isDark ? "#1A1A1A" : "#ffffff" },
        },
      }}
    />
  );
};

export default AppToaster;
