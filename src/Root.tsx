<<<<<<< HEAD
import { useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Navbar } from './components/Layout/Navbar';
import { TopBanner } from './components/Layout/TopBanner';
import Footer from './components/Layout/Footer';
import type { PageId } from './interfaces';
import { CtaSection } from './components/sections/cta/CTA';
import { useTheme } from './Context/ThemeContext';
import { RouteTransitionOverlay } from './components/common/RouteTransitionOverlay';

function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const mainRef = useRef<HTMLElement>(null);

  const isDark = theme === 'dark';

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
      />

      <RouteTransitionOverlay onTransitionEnd={() => mainRef.current?.focus()} />

      <main ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
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
=======

import { Outlet, useNavigate, useLocation } from 'react-router';
import { TopBanner } from './components/Layout/TopBanner';
import Footer from './components/Layout/Footer';
import type { PageId } from './interfaces';
import { Navbar } from './components/Layout/navBar';
import { CtaSection } from './components/sections/cta/CTA';


const pagePaths: Record<PageId, string> = {
	home: "/",
	about: "/about",
	properties: "/properties",
	services: "/services",
	contact: "/contact",
};

const Root = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const activePage = (Object.entries(pagePaths).find(
		([, path]) => path === location.pathname,
	)?.[0] ?? "home") as PageId;

	return (
		<div className="min-h-screen bg-bg-dark-1 text-white">
			<TopBanner />
			<Navbar
				activePage={activePage}
				onNavigate={(page) => navigate(pagePaths[page])}
			/>
			<main>
				<Outlet />
			</main>
			<CtaSection />
			<Footer />
		</div>
	);
};

export default Root;
>>>>>>> cea23977333ac88dd980c41bfdf2e4e465fa5280
