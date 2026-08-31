import React, { createContext, useContext, useState } from 'react';

// Cosmetic login gate only — NOT real authentication. It just remembers a
// "logged in" flag in localStorage so the site stays unlocked across page
// refreshes. See Login.tsx's handleSubmit for where access is actually granted.
const AUTH_STORAGE_KEY = 'estatein-logged-in';

interface AuthContextType {
  /** Whether the login gate is currently unlocked. */
  isAuthenticated: boolean;
  /** Unlocks the gate and persists that across refreshes. */
  login: () => void;
  /** Locks the gate again and returns to the login screen. */
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Reading localStorage is synchronous, so the flag is known immediately —
  // no async "loading" step needed like a real auth check would have.
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === 'true',
  );

  const login = () => {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Reads the current gate state and login/logout actions from context.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
