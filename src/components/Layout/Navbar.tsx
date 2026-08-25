import React, { useState } from "react";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full bg-bg-dark border-b border-t border-bg-gray-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-4">
        <Logo onClick={() => handleNavClick("home")} />

        <nav className="hidden md:flex items-center gap-2 bg-bg-dark border border-bg-gray-1 rounded-xl p-1.5 shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-bg-dark border border-bg-gray-1 text-white shadow-sm"
                    : "text-gray hover:text-white hover:bg-bg-dark/40"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("contact")}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activePage === "contact"
                ? "bg-primary text-white border border-primary"
                : "bg-bg-dark hover:bg-bg-gray-1 text-white border border-bg-gray-1 hover:border-primary/50"
            }`}
          >
            Contact Us
          </button>

          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-bg-dark border border-bg-gray-1 text-white cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-bg-gray-1 bg-bg-dark px-4 py-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activePage === item.id
                    ? "bg-bg-dark text-white border border-bg-gray-1"
                    : "text-gray hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleNavClick("contact")}
            className="w-full py-3 rounded-xl text-sm font-medium text-center bg-primary text-white"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};
