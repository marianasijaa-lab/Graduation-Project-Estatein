import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Navbar } from './components/Layout/navBar';
import { TopBanner } from './components/Layout/TopBanner';
import Footer from './components/Layout/Footer';
import type { PageId } from './interfaces';
import { CtaSection } from './components/CTA';

function Root() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDark, setIsDark] = useState(true);

  const currentPath = location.pathname.replace("/", "") || "home";
  const activePage = (currentPath === "" ? "home" : currentPath) as PageId;

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDark ? "bg-bg-dark-1 text-white" : "bg-[#FAFAFA] text-zinc-900"
      } font-['Urbanist',sans-serif]`}
    >
      <TopBanner
        message="Discover Your Dream Property with Estatein"
        actionText="Learn More"
        onActionClick={() => navigate("/properties")}
      />

      <Navbar
        activePage={activePage}
        onNavigate={(page) => navigate(page === "home" ? "/" : `/${page}`)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
      />

      <main className="flex-1">
        <Outlet />
      </main>

      <CtaSection
        bgLeftImage="public/assets/Abstract2.png"
        bgRightImage="public/assets/Abstract1.png"
        renderButton={() => (
          <a
            href="/properties"
            className="w-full sm:w-auto text-center bg-primary hover:bg-[#5e2ed9] text-white text-sm font-medium px-6 py-3.5 rounded-lg transition-colors whitespace-nowrap inline-block"
          >
            Explore Properties
          </a>
        )}
      />

      <Footer />
    </div>
  );
}

export default Root;
