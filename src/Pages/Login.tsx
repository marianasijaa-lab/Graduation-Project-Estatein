import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Logo } from "../components/common/Logo";
import { useTheme } from "../Context/ThemeContext";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  validateEmail,
  validatePassword,
  getPasswordStrength,
  getEmailQuality,
  type PasswordStrength,
} from "../utils/validation";
import { notifySuccess, notifyError } from "../utils/notify";

/** Maps a Firebase Auth error code to a short, human-readable sentence. */
const authErrorMessage = (code: string, mode: Mode): string => {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/invalid-email":
      return "That email address isn't valid.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/email-already-in-use":
      return "This email is already registered. Try logging in.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 8 characters, including numbers and symbols.";
    case "auth/network-request-failed":
      return "Network error — check your connection and try again.";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is disabled for this project.";
    case "auth/configuration-not-found":
    case "auth/invalid-api-key":
      return "Authentication isn't configured correctly. Check the Firebase setup.";
    default:
      if (code.includes("CONFIGURATION_NOT_FOUND")) {
        return "Authentication isn't configured correctly. Check the Firebase setup.";
      }
      return mode === "login" ? "Login failed. Please try again." : "Sign up failed. Please try again.";
  }
};

type Mode = "login" | "signup";

// ─── Password strength bar ───

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
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      className="mt-2 space-y-1"
    >
      <div className="flex gap-1">
        {[1, 2, 3].map((n) => (
          <motion.div
            key={n}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: n * 0.06 }}
            style={{ transformOrigin: "left" }}
            className={`h-1.5 flex-1 rounded-full ${
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
    </motion.div>
  );
};

// ─── Email suggestions ───

const EmailSuggestions = ({
  suggestions,
  onPick,
}: {
  suggestions: string[];
  onPick: (v: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -6, height: 0 }}
    animate={{ opacity: 1, y: 0, height: "auto" }}
    exit={{ opacity: 0, y: -6, height: 0 }}
    transition={{ duration: 0.25 }}
    className="mt-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2.5 space-y-1.5 overflow-hidden"
  >
    <p className="text-xs font-medium text-yellow-400">
      ⚠ This looks like a temporary or test email. Did you mean:
    </p>
    <ul className="space-y-1">
      {suggestions.map((s) => (
        <li key={s}>
          <button type="button" onClick={() => onPick(s)}
            className="text-xs text-primary hover:underline cursor-pointer">
            {s}
          </button>
        </li>
      ))}
    </ul>
  </motion.div>
);

// ─── Animation variants ───

/* page bg fades in instantly */
const pageVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/* orbs scale-up from 0 with a slight delay */
const orb1Intro: Variants = {
  hidden:  { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
  },
};
const orb2Intro: Variants = {
  hidden:  { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 },
  },
};

/* floating shapes drift in from edges */
const floatInRight: Variants = {
  hidden:  { opacity: 0, x: 40, y: -10 },
  visible: {
    opacity: 0.07, x: 0, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
  },
};
const floatInLeft: Variants = {
  hidden:  { opacity: 0, x: -40, y: 10 },
  visible: {
    opacity: 0.07, x: 0, y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
  },
};

/* card drops in with spring bounce */
const cardEntrance: Variants = {
  hidden:  { opacity: 0, y: 60, scale: 0.94, rotateX: 6 },
  visible: {
    opacity: 1, y: 0, scale: 1, rotateX: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.3,
      staggerChildren: 0.08,
      delayChildren: 0.55,
    },
  },
};

/* each child inside the card */
const childItem: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* accent line draws left → right */
const accentLine: Variants = {
  hidden:  { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1, opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.9 },
  },
};

/* ── idle loop after entrance ── */
const orb1Loop: Variants = {
  animate: {
    scale: [1, 1.18, 1],
    opacity: [0.18, 0.28, 0.18],
    transition: { duration: 9, repeat: Infinity, ease: "easeInOut" },
  },
};
const orb2Loop: Variants = {
  animate: {
    scale: [1, 1.25, 1],
    opacity: [0.1, 0.2, 0.1],
    transition: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 },
  },
};
const floatLoop1: Variants = {
  animate: {
    y: [-12, 12, -12],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};
const floatLoop2: Variants = {
  animate: {
    y: [10, -10, 10],
    transition: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
  },
};

/* form slide on mode change */
const formVariants: Variants = {
  hidden:  { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit:    { opacity: 0, x: -16, transition: { duration: 0.25 } },
};

const errorAlertVariants: Variants = {
  hidden:  { opacity: 0, y: -8, height: 0 },
  visible: { opacity: 1, y: 0,  height: "auto", transition: { duration: 0.3 } },
  exit:    { opacity: 0, y: -8, height: 0,       transition: { duration: 0.2 } },
};

const shakeAnim = {
  x: [-9, 9, -7, 7, -4, 4, 0],
  transition: { duration: 0.45 },
};

// ─── Main component ───

export const Login = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [mode, setMode] = useState<Mode>("login");
  const [shake, setShake] = useState(false);

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  const [emailError,    setEmailError]    = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [emailTouched,    setEmailTouched]    = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading,   setLoading]   = useState(false);

  // ── mode switch ──

  const switchMode = (next: Mode) => {
    setMode(next);
    setEmail(""); setPassword("");
    setEmailError(""); setPasswordError("");
    setEmailTouched(false); setPasswordTouched(false);
    setEmailSuggestions([]);
    setAuthError(null);
  };

  // ── field handlers ──

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setAuthError(null);
    setEmailSuggestions([]);
    if (emailTouched) {
      const err = validateEmail(val);
      setEmailError(err);
      if (!err && mode === "signup") setEmailSuggestions(getEmailQuality(val).suggestions);
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
    if (!err && mode === "signup") setEmailSuggestions(getEmailQuality(email).suggestions);
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

  // ── submit ──

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);

    if (!eErr && mode === "signup") {
      const quality = getEmailQuality(email);
      setEmailSuggestions(quality.suggestions);
      if (quality.weak && emailSuggestions.length === 0) return;
    }

    if (eErr || pErr) { triggerShake(); return; }

    if (!auth) {
      const msg = "Firebase is not configured. Check your .env file.";
      setAuthError(msg);
      notifyError(msg);
      triggerShake(); return;
    }

    setAuthError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      }
      notifySuccess(mode === "login" ? "Signed in successfully" : "Account created");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const message = authErrorMessage(code, mode);
      setAuthError(message);
      notifyError(message);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // ── style helpers ──

  const baseField = "w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200";

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
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className={`relative min-h-screen flex items-center justify-center px-4 overflow-hidden ${
        isDark ? "bg-bg-dark-1 text-white" : "bg-[#FAFAFA] text-zinc-900"
      }`}
    >

      {/* ── orb 1 (top-left): scales in on mount, then loops ── */}
      <motion.div
        variants={orb1Intro}
        initial="hidden"
        animate="visible"
        className="absolute top-[-140px] left-[-100px] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(106,90,205,0.22) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
        aria-hidden="true"
      >
        {/* inner breathing ring after entrance */}
        <motion.div
          variants={orb1Loop}
          animate="animate"
          className="w-full h-full rounded-full"
        />
      </motion.div>

      {/* ── orb 2 (bottom-right) ── */}
      <motion.div
        variants={orb2Intro}
        initial="hidden"
        animate="visible"
        className="absolute bottom-[-80px] right-[-80px] w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(106,90,205,0.22) 0%, transparent 70%)",
          filter: "blur(56px)",
        }}
        aria-hidden="true"
      >
        <motion.div
          variants={orb2Loop}
          animate="animate"
          className="w-full h-full rounded-full"
        />
      </motion.div>

      {/* ── floating shape top-right (drifts in from right, then floats) ── */}
      <motion.div
        variants={floatInRight}
        initial="hidden"
        animate="visible"
        className="absolute top-8 right-8 w-20 h-20 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div variants={floatLoop1} animate="animate">
          <img src="/assets/Abstract1.png" alt="" className="w-full h-full object-contain" />
        </motion.div>
      </motion.div>

      {/* ── floating shape bottom-left (drifts in from left, then floats) ── */}
      <motion.div
        variants={floatInLeft}
        initial="hidden"
        animate="visible"
        className="absolute bottom-12 left-8 w-16 h-16 pointer-events-none"
        aria-hidden="true"
      >
        <motion.div variants={floatLoop2} animate="animate">
          <img src="/assets/Abstract2.png" alt="" className="w-full h-full object-contain" />
        </motion.div>
      </motion.div>

      {/* ── CARD — drops in with perspective + stagger children ── */}
      <motion.div
        variants={cardEntrance}
        initial="hidden"
        animate="visible"
        style={{ perspective: 800 }}
        className="relative z-10 w-full max-w-sm"
      >
        {/* shake wrapper — only fires on error */}
        <motion.div animate={shake ? shakeAnim : {}}>

          <div
            className={`relative rounded-2xl border p-8 space-y-6 ${
              isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"
            }`}
            style={{
              boxShadow: isDark
                ? "0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5)"
                : "0 24px 64px rgba(0,0,0,0.09)",
            }}
          >

            {/* ── top accent line draws in ── */}
            <motion.div
              variants={accentLine}
              initial="hidden"
              animate="visible"
              style={{ transformOrigin: "left" }}
              className="absolute top-0 left-8 right-8 h-px rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />

            {/* ── Logo ── */}
            <motion.div variants={childItem} className="flex justify-center">
              <Logo animated="full" />
            </motion.div>

            {/* ── Mode tabs ── */}
            <motion.div
              variants={childItem}
              className={`flex rounded-xl p-1 ${isDark ? "bg-bg-dark" : "bg-gray-100"}`}
            >
              {(["login", "signup"] as Mode[]).map((m) => (
                <motion.button
                  key={m}
                  type="button"
                  onClick={() => switchMode(m)}
                  whileHover={{ scale: mode !== m ? 1.02 : 1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    mode === m
                      ? "text-white"
                      : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {mode === m && (
                    <motion.span
                      layoutId="active-tab"
                      className="absolute inset-0 rounded-lg bg-primary shadow"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {m === "login" ? "Log In" : "Sign Up"}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* ── Form (slides on mode switch) ── */}
            <motion.div variants={childItem}>
              <AnimatePresence mode="wait">
                <motion.form
                  key={mode}
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  {/* Email */}
                  <div>
                    <label className={labelClass} htmlFor="login-email">Email</label>
                    <motion.input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      onBlur={handleEmailBlur}
                      aria-invalid={showEmailErr}
                      aria-describedby={showEmailErr ? "login-email-error" : undefined}
                      whileFocus={{
                        boxShadow: showEmailErr
                          ? "0 0 0 3px rgba(239,68,68,0.15)"
                          : "0 0 0 3px rgba(106,90,205,0.15)",
                      }}
                      transition={{ duration: 0.15 }}
                      className={fieldClass(showEmailErr)}
                    />
                    <AnimatePresence>
                      {showEmailErr && (
                        <motion.p
                          id="login-email-error"
                          key="email-error"
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.25 }}
                          role="alert"
                          className={`${errorClass} overflow-hidden`}
                        >
                          <span aria-hidden="true">⚠</span>{emailError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {mode === "signup" && !showEmailErr && emailSuggestions.length > 0 && (
                        <EmailSuggestions suggestions={emailSuggestions} onPick={handlePickSuggestion} />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Password */}
                  <div>
                    <label className={labelClass} htmlFor="login-password">Password</label>
                    <motion.input
                      id="login-password"
                      type="password"
                      autoComplete={mode === "login" ? "current-password" : "new-password"}
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      onBlur={handlePasswordBlur}
                      aria-invalid={showPasswordErr}
                      aria-describedby={showPasswordErr ? "login-password-error" : undefined}
                      whileFocus={{
                        boxShadow: showPasswordErr
                          ? "0 0 0 3px rgba(239,68,68,0.15)"
                          : "0 0 0 3px rgba(106,90,205,0.15)",
                      }}
                      transition={{ duration: 0.15 }}
                      className={fieldClass(showPasswordErr)}
                    />
                    <AnimatePresence>
                      {showPasswordErr && (
                        <motion.p
                          id="login-password-error"
                          key="password-error"
                          initial={{ opacity: 0, y: -6, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -6, height: 0 }}
                          transition={{ duration: 0.25 }}
                          role="alert"
                          className={`${errorClass} overflow-hidden`}
                        >
                          <span aria-hidden="true">⚠</span>{passwordError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {mode === "signup" && password && (
                        <PasswordStrengthBar value={password} />
                      )}
                    </AnimatePresence>
                    {mode === "signup" && !password && !showPasswordErr && (
                      <p className={`mt-1.5 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        Min 8 characters. Mix uppercase, numbers &amp; symbols for a strong password.
                      </p>
                    )}
                  </div>

                  {/* Auth error */}
                  <AnimatePresence>
                    {authError && (
                      <motion.p
                        key="auth-error"
                        variants={errorAlertVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        role="alert"
                        className="overflow-hidden text-sm text-red-400 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20"
                      >
                        {authError}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={!loading ? { scale: 1.02, boxShadow: "0 8px 28px rgba(106,90,205,0.35)" } : {}}
                    whileTap={!loading ? { scale: 0.97 } : {}}
                    transition={{ duration: 0.15 }}
                    className="relative w-full py-3 rounded-xl text-sm font-medium bg-primary text-white transition-opacity duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                      whileHover={{ translateX: "200%" }}
                      transition={{ duration: 0.55, ease: "easeInOut" }}
                      aria-hidden="true"
                    />
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <motion.span
                            className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                          />
                          {mode === "login" ? "Signing in…" : "Creating account…"}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {mode === "login" ? "Log In" : "Create Account"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.form>
              </AnimatePresence>
            </motion.div>

            {/* ── Switch mode hint ── */}
            <motion.p
              variants={childItem}
              className={`text-center text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              {mode === "login" ? (
                <>Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => switchMode("signup")}
                    className="text-primary hover:underline cursor-pointer">Sign up</button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button type="button" onClick={() => switchMode("login")}
                    className="text-primary hover:underline cursor-pointer">Log in</button>
                </>
              )}
            </motion.p>

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


