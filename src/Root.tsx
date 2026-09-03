import { useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Navbar } from './components/Layout/Navbar';
import { TopBanner } from './components/Layout/TopBanner';
import Footer from './components/Layout/Footer';
import type { PageId } from './interfaces';
import { CtaSection } from './components/sections/cta/CTA';
import { useTheme } from './Context/ThemeContext';
import { RouteTransitionOverlay } from './components/common/RouteTransitionOverlay';

const pagePaths: Record<PageId, string> = {
  home: "/",
  about: "/about",
  properties: "/properties",
  services: "/services",
  contact: "/contact",
};

function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const mainRef = useRef<HTMLElement>(null);

  const isDark = theme === 'dark';

  useEffect(() => {
    history.scrollRestoration = 'manual';

    // When the app is opened with a hash (e.g. /contact#office-abc from the
    // dashboard's "View on site" links), scroll to that element once it exists.
    // Data-driven sections mount asynchronously, so retry briefly.
    const targetId = window.location.hash.slice(1);
    if (targetId) {
      let attempts = 0;
      let highlightTimer: number | undefined;

      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Per-item anchors (only the Offices cards use `office-<id>`) get a
          // brief one-shot pulse so the specific card stands out. Section-level
          // anchors (#testimonials, #achievements, …) wrap a whole section /
          // carousel, so they are left with plain scroll-to behaviour.
          if (targetId.startsWith('office-')) {
            el.classList.add('highlight-pulse');
            highlightTimer = window.setTimeout(() => {
              el.classList.remove('highlight-pulse');
            }, 1600);
          }
        } else if (attempts++ < 40) {
          window.setTimeout(scrollToTarget, 100);
        }
      };

      scrollToTarget();
      return () => {
        if (highlightTimer) window.clearTimeout(highlightTimer);
      };
    }

    window.scrollTo(0, 0);
  }, []);

  const activePage = (
    location.pathname.startsWith("/property-details/")
      ? null
      : Object.entries(pagePaths).find(
          ([, path]) => path === location.pathname,
        )?.[0] ?? "home"
  ) as PageId | null;

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
        onNavigate={(page) => navigate(pagePaths[page])}
      />

      <RouteTransitionOverlay onTransitionEnd={() => mainRef.current?.focus()} />

      <main ref={mainRef} tabIndex={-1} className="flex-1 outline-none overflow-x-clip">
        <Outlet />
      </main>

      <CtaSection
        bgLeftImage="/assets/Abstract2.png"
        bgRightImage="/assets/Abstract1.png"
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
