
import { Outlet, useNavigate, useLocation } from 'react-router';
import { useEffect } from 'react';
import { TopBanner } from './components/Layout/TopBanner';
import Footer from './components/Layout/Footer';
import type { PageId } from './interfaces';
import { Navbar } from './components/Layout/Navbar';
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

	useEffect(() => {
		history.scrollRestoration = 'manual';
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
