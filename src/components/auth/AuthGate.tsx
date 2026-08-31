import type { ReactNode } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Login } from "../../Pages/Login";

interface AuthGateProps {
  children: ReactNode;
}

// Blocks the whole app behind Firebase Auth —
// - While Firebase is resolving the initial auth state: show nothing (avoid flash).
// - No signed-in user: show the Login form.
// - Signed-in user: render the app normally.
export const AuthGate = ({ children }: AuthGateProps) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait for Firebase to resolve the auth state before rendering anything.
  // This prevents a flash of the Login screen for already-authenticated users
  // on page refresh.
  if (loading) return null;

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
};
