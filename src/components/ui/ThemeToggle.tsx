import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useTheme } from "../../Context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-secondary)] border border-[var(--color-border)] text-[var(--text-main)] hover:text-[#703BF7] transition-all cursor-pointer shadow-sm"
    >
      {theme === "dark" ? (
        <HiOutlineSun className="text-xl text-[#F5C344]" />
      ) : (
        <HiOutlineMoon className="text-xl text-[#703BF7]" />
      )}
    </button>
  );
}
