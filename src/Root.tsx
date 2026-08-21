import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Navbar } from './components/Layout/navBar';
import { TopBanner } from './components/Layout/TopBanner';
import type { PageId } from './interfaces';
import TestPage from './testPage';

function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDark, setIsDark] = useState(true);

  const currentPath = location.pathname.replace('/', '') || 'home';
  const activePage = (currentPath === '' ? 'home' : currentPath) as PageId;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark
          ? 'bg-[#141414] text-white'
          : 'bg-[#FAFAFA] text-zinc-900'
      } font-['Urbanist',sans-serif]`}
    >
      <TopBanner
        message="Discover Your Dream Property with Estatein"
        actionText="Learn More"
        onActionClick={() => navigate('/properties')}
      />

      <Navbar
        activePage={activePage}
        onNavigate={(page) =>
          navigate(page === 'home' ? '/' : `/${page}`)
        }
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <main className="flex-1">
         <TestPage /> 
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
