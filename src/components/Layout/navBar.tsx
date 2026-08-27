import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../common/Logo";
import type { PageId } from "../../interfaces";
import ThemeToggle from "../ui/ThemeToggle";

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "properties", label: "Properties" },
  { id: "services", label: "Services" },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  isDark: _isDark = true,
  onToggleTheme: _onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full bg-[#1A1A1A] border-b border-t border-bg-gray-1"
    >
      <div className="site-container h-20 sm:h-24 flex items-center justify-between gap-4">
        <Logo onClick={() => handleNavClick("home")} />

        <nav className="hidden md:flex items-center gap-2 bg-[#1A1A1A] border border-bg-gray-1 rounded-xl p-1.5 shadow-inner">
          {NAV_ITEMS.map((item, index) => {
            const isActive = activePage === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.06 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-bg-dark-1 border border-bg-gray-1 text-white shadow-sm"
                    : "text-gray hover:text-white hover:bg-bg-dark/40"
                }`}
              >
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick("contact")}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activePage === "contact"
                ? "bg-primary text-white border border-primary"
                : "bg-bg-dark-1 hover:bg-bg-gray-1 text-white border border-bg-gray-1 hover:border-primary/50"
            }`}
          >
            Contact Us
          </motion.button>

          <ThemeToggle />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#1A1A1A] border border-bg-gray-1 text-white cursor-pointer"
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden overflow-hidden border-t border-bg-gray-1 bg-[#1A1A1A] px-4 py-6 space-y-3"
          >
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item, index) => (
                    <motion.button
                  key={item.id}
                      initial={{ x: -12, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activePage === item.id
                      ? "bg-[#1A1A1A] text-white border border-bg-gray-1"
                      : "text-gray hover:text-white"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full py-3 rounded-xl text-sm font-medium text-center bg-primary text-white"
            >
              Contact Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};