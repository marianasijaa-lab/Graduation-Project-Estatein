import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "../../Context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      className="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-secondary)] border border-[var(--color-border)] text-[var(--text-main)] hover:text-[#703BF7] transition-all cursor-pointer shadow-sm overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.25 }}
          >
            <HiOutlineSun className="text-xl text-[#F5C344]" />
          </motion.span>
        ) : (
        <motion.span
          key="moon"
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25 }}
        >
          <HiOutlineMoon className="text-xl text-[#703BF7]" />
        </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
