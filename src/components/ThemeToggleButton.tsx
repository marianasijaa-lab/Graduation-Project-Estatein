import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export default function ThemeToggle() {

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== null ? saved === "dark" : true; // الافتراضي true (Dark)
  });

  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle Theme"
  
      className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--bg-main)] hover:bg-[var(--bg-secondary)] border border-[var(--color-border)] text-[var(--text-main)] hover:text-[#703BF7] transition-all cursor-pointer shadow-sm"
    >
      {darkMode ? (
        <HiOutlineSun className="text-xl text-[#F5C344]" />
      ) : (
        <HiOutlineMoon className="text-xl text-[#703BF7]" />
      )}
    </button>
  );
}