import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLocation } from "react-router";
import { DemoDataBanner } from "./DemoDataBanner";

// ── Shared variants ───

/** Outer page wrapper — fades + rises as a whole. */
export const pageVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Stagger container — orchestrates children one after another. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

/** Each staggered child — slides up from 12 px with a fade. */
export const staggerItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Table row / mobile card — no animation to prevent re-render flicker. */
export const rowVariants = {
  hidden:  { opacity: 1 },
  visible: { opacity: 1 },
};

/** Passthrough — kept for API compatibility across all pages. */
export const rowStagger = {
  hidden: {},
  visible: {},
};

export const tableRowVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

/** Icon action button — scale + rotate on hover, squish on tap. */
export const iconBtnHover = {
  whileHover: { scale: 1.18, rotate: 4 },
  whileTap:   { scale: 0.88 },
  transition: { duration: 0.15 },
};

/** Destructive icon button (delete) — scale + red glow on hover. */
export const deleteBtnHover = {
  whileHover: { scale: 1.18, rotate: -4 },
  whileTap:   { scale: 0.88 },
  transition: { duration: 0.15 },
};

/** Mobile card hover — gentle lift + shadow. */
export const cardHoverProps = {
  whileHover: { y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.18)" },
  whileTap:   { scale: 0.985 },
  transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] },
};

// ── SkeletonRow ──

interface SkeletonRowProps {
  cols?: number;
  isDark: boolean;
}

/** Animated shimmer skeleton row used in loading states for all pages. */
export const SkeletonRow = ({ cols = 4, isDark }: SkeletonRowProps) => {
  const widths = ["w-8", "w-24", "w-32", "w-20", "w-16", "w-12", "w-28"];
  return (
    <tr className={`border-b ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-5 py-3.5">
          <motion.div
            className={`h-3 rounded-full ${isDark ? "bg-bg-gray-1" : "bg-gray-200"} ${widths[i % widths.length]}`}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          />
        </td>
      ))}
    </tr>
  );
};

// ── SkeletonCard ──

interface SkeletonCardProps {
  isDark: boolean;
}

/** Animated shimmer skeleton card used in mobile loading states. */
export const SkeletonCard = ({ isDark }: SkeletonCardProps) => {
  const bar = (w: string, h = "h-3") => (
    <motion.div
      className={`${h} ${w} rounded-full ${isDark ? "bg-bg-gray-1" : "bg-gray-200"}`}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
  return (
    <div className={`rounded-2xl border p-4 space-y-3 ${isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200"}`}>
      <div className="flex gap-3">
        <motion.div
          className={`w-12 h-12 rounded-xl shrink-0 ${isDark ? "bg-bg-gray-1" : "bg-gray-200"}`}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex-1 space-y-2 py-1">
          {bar("w-3/4")}
          {bar("w-1/2", "h-2")}
        </div>
      </div>
      {bar("w-full", "h-2")}
      {bar("w-4/5", "h-2")}
    </div>
  );
};

// ── Component ──

interface DashboardPageShellProps {
  children: ReactNode;
}

export const DashboardPageShell = ({ children }: DashboardPageShellProps) => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col gap-6"
      >
        <DemoDataBanner />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
