import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../components/common/Logo';
import { StarCluster } from '../components/common/StarCluster';

// ─── animation variants ───────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const floatVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

const orb1Variants = {
  initial: { scale: 1, opacity: 0.15 },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.15, 0.25, 0.15],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
  },
};

const orb2Variants = {
  initial: { scale: 1, opacity: 0.1 },
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.1, 0.2, 0.1],
    transition: { duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 },
  },
};

const shakeVariants = {
  shake: {
    x: [-8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.5 },
  },
  idle: { x: 0 },
};

const errorVariants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    height: 0,
    transition: { duration: 0.2 },
  },
};

// ─── component ────────────────────────────────────────────────────────────────

export default function Login() {
  const [email, setEmail] = useState('team@example.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  const login = async () => {
    if (!auth) {
      setError('Firebase غير مهيأ. أضف متغيرات البيئة أولاً.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError('بيانات الدخول غير صحيحة');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') login();
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-(--bg-main)"
    >
      {/* ── ambient background orbs ── */}
      <motion.div
        variants={orb1Variants}
        initial="initial"
        animate="animate"
        className="absolute top-[-120px] left-[-120px] w-[480px] h-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(106,90,205,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />
      <motion.div
        variants={orb2Variants}
        initial="initial"
        animate="animate"
        className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(99,179,237,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        aria-hidden="true"
      />

      {/* ── floating abstract shape ── */}
      <motion.div
        variants={floatVariants}
        initial="initial"
        animate="animate"
        className="absolute top-10 right-10 w-24 h-24 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/assets/Abstract1.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </motion.div>
      <motion.div
        variants={floatVariants}
        initial="initial"
        animate={{
          y: [10, -10, 10],
          transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute bottom-16 left-10 w-20 h-20 opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/assets/Abstract2.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </motion.div>

      {/* ── login card ── */}
      <motion.div
        variants={shake ? shakeVariants : cardVariants}
        initial="hidden"
        animate={shake ? 'shake' : 'visible'}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="rounded-2xl border border-[#262626] bg-(--bg-secondary) shadow-2xl overflow-hidden"
          style={{
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.04), 0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          {/* top accent bar */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6a5acd55] to-transparent" />

          <div className="p-8 sm:p-10 space-y-8">
            {/* header */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-center">
                <Logo animated="full" />
              </div>
              <div className="text-center space-y-1.5">
                <StarCluster className="justify-center" />
                <h1 className="text-2xl font-semibold text-(--text-main) tracking-tight">
                  مرحباً بعودتك
                </h1>
                <p className="text-sm text-gray-500">
                  سجّل دخولك للوصول إلى لوحة التحكم
                </p>
              </div>
            </motion.div>

            {/* form */}
            <motion.div variants={itemVariants} className="space-y-4">
              {/* email field */}
              <motion.div
                className="space-y-1.5"
                whileFocusWithin={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                  البريد الإلكتروني
                </label>
                <motion.input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="email@example.com"
                  type="email"
                  autoComplete="email"
                  whileFocus={{ borderColor: '#6a5acd', boxShadow: '0 0 0 3px rgba(106,90,205,0.15)' }}
                  className="w-full px-4 py-3 rounded-xl bg-(--bg-main) border border-[#262626] text-(--text-main) placeholder-gray-600 text-sm outline-none transition-colors duration-200 focus:border-[#6a5acd]"
                />
              </motion.div>

              {/* password field */}
              <motion.div
                className="space-y-1.5"
                whileFocusWithin={{ scale: 1.005 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">
                  كلمة المرور
                </label>
                <motion.input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  whileFocus={{ borderColor: '#6a5acd', boxShadow: '0 0 0 3px rgba(106,90,205,0.15)' }}
                  className="w-full px-4 py-3 rounded-xl bg-(--bg-main) border border-[#262626] text-(--text-main) placeholder-gray-600 text-sm outline-none transition-colors duration-200 focus:border-[#6a5acd]"
                />
              </motion.div>

              {/* error message */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    key="error"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-red-400 text-xs px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* submit button */}
            <motion.div variants={itemVariants}>
              <motion.button
                onClick={login}
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, boxShadow: '0 8px 30px rgba(106,90,205,0.35)' } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="relative w-full py-3.5 rounded-xl bg-primary text-white font-semibold text-sm tracking-wide overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition-opacity duration-200 cursor-pointer"
              >
                {/* shimmer on hover */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  whileHover={{ translateX: '200%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  aria-hidden="true"
                />

                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <motion.span
                        className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      جارٍ الدخول...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      تسجيل الدخول
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>

          {/* bottom accent bar */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#6a5acd33] to-transparent" />
        </div>
      </motion.div>
    </motion.div>
  );
}
