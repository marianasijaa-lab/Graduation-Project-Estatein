import type { ReactNode } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Login } from "../../Pages/Login";

interface AuthGateProps {
  children: ReactNode;
}

export const AuthGate = ({ children }: AuthGateProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};
