import React, { useState } from 'react';
import { TopBanner } from './components/Layout/TopBanner';
import { Navbar } from './components/Layout/navBar';
import type { PageId } from './interfaces';
import './index.css';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-[#141414] text-white' : 'bg-[#FAFAFA] text-zinc-900'} font-['Urbanist',sans-serif]`}>
      {/* 1. Top Announcement Notification Banner */}
      <TopBanner
        message="✨ Discover Your Dream Property with Estatein"
        actionText="Learn More"
        onActionClick={() => setActivePage('properties')}
      />

      {/* 2. Main Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={(page) => setActivePage(page)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
