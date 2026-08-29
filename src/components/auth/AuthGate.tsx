import type { ReactNode } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Login } from "../../Pages/Login";

interface AuthGateProps {
  children: ReactNode;
}

// Blocks the whole app behind the cosmetic login gate (see AuthContext.tsx) —
// shows Login when locked, or the app once "logged in".
export const AuthGate = ({ children }: AuthGateProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};
