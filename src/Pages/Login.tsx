import { useState } from "react";
import { Logo } from "../components/common/Logo";
import { useTheme } from "../Context/ThemeContext";
import { useAuth } from "../Context/AuthContext";

// Full-screen login form — shown by AuthGate instead of the site when locked.
export const Login = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Cosmetic gate only — NOT real authentication. Any non-empty email and
  // password is accepted; nothing is checked against Firebase or a backend.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setError(null);
    login();
  };

  const inputBgClass = isDark
    ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary";
  const fieldClass = `w-full px-4 py-3 rounded-xl border outline-none transition-all ${inputBgClass}`;
  const labelClass = `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDark ? "bg-bg-dark-1 text-white" : "bg-[#FAFAFA] text-zinc-900"
      }`}
    >
      <div
        className={`w-full max-w-sm rounded-2xl border p-8 space-y-6 ${
          isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-center">
          <Logo />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className={labelClass} htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-medium bg-primary hover:bg-[#5e2ed9] text-white transition-colors cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
