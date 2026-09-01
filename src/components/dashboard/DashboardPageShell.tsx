/**
 * DashboardPageShell
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps every dashboard management page with:
 *   • A fade + slide-up entrance that re-triggers on every route change
 *     (keyed by pathname so Framer Motion unmounts/remounts correctly)
 *   • A stagger context so direct children animate in sequence
 *
 * Usage
 * ─────
 *   <DashboardPageShell>
 *     <HeaderRow />        ← child 0 → delay 0
 *     <SearchBar />        ← child 1 → delay 0.06
 *     <Table />            ← child 2 → delay 0.12
 *   </DashboardPageShell>
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useLocation } from "react-router";

// ── Shared variants ────────────────────────────────────────────────────────────

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

/** Table row / mobile card — lighter movement. */
export const rowVariants = {
  hidden:  { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.26, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/** Stagger container specifically for table rows / mobile cards. */
export const rowStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.1,
    },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface DashboardPageShellProps {
  children: ReactNode;
}

export const DashboardPageShell = ({ children }: DashboardPageShellProps) => {
  const { pathname } = useLocation();

  return (
    <motion.div
      key={pathname}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {children}
    </motion.div>
  );
};
