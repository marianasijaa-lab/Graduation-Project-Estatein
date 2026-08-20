import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from '../common/Logo';
import type { PageId } from '../../interfaces';
import ThemeToggle from '../ThemeToggleButton';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'properties', label: 'Properties' },
  { id: 'services', label: 'Services' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  isDark = true,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#141414] border-b border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-4">
     
        <Logo onClick={() => handleNavClick('home')} />

       
        <nav className="hidden md:flex items-center gap-2 bg-[#1A1A1A] border border-[#262626] rounded-xl p-1.5 shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#141414] border border-[#262626] text-white shadow-sm'
                    : 'text-[#999999] hover:text-white hover:bg-[#141414]/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

       
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('contact')}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activePage === 'contact'
                ? 'bg-[#703BF7] text-white border border-[#703BF7]'
                : 'bg-[#141414] hover:bg-[#1A1A1A] text-white border border-[#262626] hover:border-[#703BF7]/50'
            }`}
          >
            Contact Us
          </button>

      {  /*  {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] text-white transition-all cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#F5C344]" /> : <Moon className="w-4 h-4 text-[#703BF7]" />}
            </button>
          )}*/}
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#141414] border border-[#262626] text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#262626] bg-[#141414] px-4 py-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activePage === item.id ? 'bg-[#1A1A1A] text-white border border-[#262626]' : 'text-[#999999] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full py-3 rounded-xl text-sm font-medium text-center bg-[#703BF7] text-white"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};