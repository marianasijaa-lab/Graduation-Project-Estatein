import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Logo } from "../components/common/Logo";
import { useTheme } from "../Context/ThemeContext";
import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
  getEmailQuality,
  type PasswordStrength,
} from "../utils/validation";

type Mode = "login" | "signup";

// ─── Password strength bar ────────────────────────────────────────────────────

const STRENGTH_META: Record<
  Exclude<PasswordStrength, "empty">,
  { label: string; color: string; bars: number }
> = {
  weak:   { label: "Weak",   color: "bg-red-500",    bars: 1 },
  fair:   { label: "Fair",   color: "bg-yellow-400", bars: 2 },
  strong: { label: "Strong", color: "bg-green-500",  bars: 3 },
};

const PasswordStrengthBar = ({ value }: { value: string }) => {
  const strength = getPasswordStrength(value);
  if (strength === "empty" || !value) return null;
  const meta = STRENGTH_META[strength];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              n <= meta.bars ? meta.color : "bg-gray-600"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${
        strength === "weak"   ? "text-red-400" :
        strength === "fair"   ? "text-yellow-400" :
        "text-green-400"
      }`}>
        {meta.label} password
        {strength === "weak" && " — add uppercase, numbers or symbols"}
        {strength === "fair" && " — add one more character type to strengthen"}
      </p>
    </div>
  );
};

// ─── Email suggestions ────────────────────────────────────────────────────────

const EmailSuggestions = ({
  suggestions,
  onPick,
}: {
  suggestions: string[];
  onPick: (v: string) => void;
}) => (
  <div className="mt-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2.5 space-y-1.5">
    <p className="text-xs font-medium text-yellow-400">
      ⚠ This looks like a temporary or test email. Did you mean:
    </p>
    <ul className="space-y-1">
      {suggestions.map((s) => (
        <li key={s}>
          <button
            type="button"
            onClick={() => onPick(s)}
            className="text-xs text-primary hover:underline cursor-pointer"
          >
            {s}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

export const Login = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [mode, setMode] = useState<Mode>("login");

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  const [emailError,    setEmailError]    = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailTouched,    setEmailTouched]    = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // email quality (only checked in signup mode after blur)
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);

  const [authError, setAuthError] = useState<string | null>(null);
  const [loading,   setLoading]   = useState(false);

  // ── mode switch ───────────────────────────────────────────────────────────

  const switchMode = (next: Mode) => {
    setMode(next);
    setEmail(""); setPassword("");
    setEmailError(""); setPasswordError("");
    setEmailTouched(false); setPasswordTouched(false);
    setEmailSuggestions([]);
    setAuthError(null);
  };

  // ── field handlers ────────────────────────────────────────────────────────

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setAuthError(null);
    setEmailSuggestions([]);
    if (emailTouched) {
      const err = validateEmail(val);
      setEmailError(err);
      if (!err && mode === "signup") {
        setEmailSuggestions(getEmailQuality(val).suggestions);
      }
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setAuthError(null);
    if (passwordTouched) setPasswordError(validatePassword(val));
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    const err = validateEmail(email);
    setEmailError(err);
    if (!err && mode === "signup") {
      setEmailSuggestions(getEmailQuality(email).suggestions);
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordError(validatePassword(password));
  };

  const handlePickSuggestion = (val: string) => {
    setEmail(val);
    setEmailSuggestions([]);
    setEmailError("");
  };

  // ── submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);

    // In signup: also check email quality (show suggestions but don't block)
    if (!eErr && mode === "signup") {
      const quality = getEmailQuality(email);
      setEmailSuggestions(quality.suggestions);
      // If email is weak AND user hasn't explicitly dismissed, block submit once
      // so they see the suggestions. They can submit again to proceed.
      if (quality.weak && emailSuggestions.length === 0) return;
    }

    if (eErr || pErr) return;

    if (!auth) {
      setAuthError("Firebase is not configured. Check your .env file.");
      return;
    }

    setAuthError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (["auth/user-not-found","auth/wrong-password","auth/invalid-credential"].includes(code)) {
        setAuthError("Incorrect email or password.");
      } else if (code === "auth/email-already-in-use") {
        setAuthError("This email is already registered. Try logging in.");
      } else if (code === "auth/too-many-requests") {
        setAuthError("Too many failed attempts. Please try again later.");
      } else if (code === "auth/weak-password") {
        setAuthError("Password is too weak. Use at least 8 characters, including numbers and symbols.");
      } else {
        setAuthError(mode === "login" ? "Login failed. Please try again." : "Sign up failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── style helpers ─────────────────────────────────────────────────────────

  const baseField = "w-full px-4 py-3 rounded-xl border outline-none transition-all";

  const fieldClass = (hasError: boolean) =>
    `${baseField} ${
      hasError
        ? isDark
          ? "bg-bg-dark border-red-500 text-white placeholder-gray-500 focus:border-red-400"
          : "bg-gray-50 border-red-500 text-gray-900 placeholder-gray-400 focus:border-red-400"
        : isDark
        ? "bg-bg-dark border-bg-gray-1 text-white placeholder-gray-500 focus:border-primary"
        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-primary"
    }`;

  const labelClass = `block text-sm font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`;
  const errorClass = "mt-1.5 flex items-center gap-1 text-xs text-red-400";

  const showEmailErr    = emailTouched && !!emailError;
  const showPasswordErr = passwordTouched && !!passwordError;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? "bg-bg-dark-1 text-white" : "bg-[#FAFAFA] text-zinc-900"}`}>
      <div className={`w-full max-w-sm rounded-2xl border p-8 space-y-6 ${isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"}`}>

        {/* Logo */}
        <div className="flex justify-center">
          <Logo />
        </div>

        {/* Mode tabs */}
        <div className={`flex rounded-xl p-1 ${isDark ? "bg-bg-dark" : "bg-gray-100"}`}>
          {(["login", "signup"] as Mode[]).map((m) => (
            <button key={m} type="button" onClick={() => switchMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === m
                  ? "bg-primary text-white shadow"
                  : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
              }`}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {/* ── Email ── */}
          <div>
            <label className={labelClass} htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              aria-invalid={showEmailErr}
              aria-describedby={showEmailErr ? "login-email-error" : undefined}
              className={fieldClass(showEmailErr)}
            />
            {showEmailErr && (
              <p id="login-email-error" role="alert" className={errorClass}>
                <span aria-hidden="true">⚠</span>{emailError}
              </p>
            )}
            {/* Email quality suggestions (signup only) */}
            {mode === "signup" && !showEmailErr && emailSuggestions.length > 0 && (
              <EmailSuggestions suggestions={emailSuggestions} onPick={handlePickSuggestion} />
            )}
          </div>

          {/* ── Password ── */}
          <div>
            <label className={labelClass} htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={handlePasswordBlur}
              aria-invalid={showPasswordErr}
              aria-describedby={showPasswordErr ? "login-password-error" : undefined}
              className={fieldClass(showPasswordErr)}
            />
            {showPasswordErr && (
              <p id="login-password-error" role="alert" className={errorClass}>
                <span aria-hidden="true">⚠</span>{passwordError}
              </p>
            )}

            {/* Strength meter — signup only, shown while typing */}
            {mode === "signup" && password && (
              <PasswordStrengthBar value={password} />
            )}

            {/* Hint when field is empty in signup */}
            {mode === "signup" && !password && !showPasswordErr && (
              <p className={`mt-1.5 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                Min 8 characters. Mix uppercase, numbers & symbols for a strong password.
              </p>
            )}
          </div>

          {/* Auth-level error */}
          {authError && (
            <p role="alert" className="text-sm text-red-500">{authError}</p>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-medium bg-primary hover:bg-[#5e2ed9] text-white transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
            {loading
              ? (mode === "login" ? "Signing in…" : "Creating account…")
              : (mode === "login" ? "Log In"      : "Create Account")}
          </button>
        </form>

        {/* Switch mode hint */}
        <p className={`text-center text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          {mode === "login" ? (
            <>Don't have an account?{" "}
              <button type="button" onClick={() => switchMode("signup")}
                className="text-primary hover:underline cursor-pointer">Sign up</button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button type="button" onClick={() => switchMode("login")}
                className="text-primary hover:underline cursor-pointer">Log in</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
