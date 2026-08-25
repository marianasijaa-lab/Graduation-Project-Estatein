import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./components/Layout/Footer";
import { Navbar } from "./components/Layout/Navbar";
import { TopBanner } from "./components/Layout/TopBanner";
import type { PageId } from "./interfaces";

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
		<div className="min-h-screen bg-bg-dark text-white">
			<TopBanner />
			<Navbar
				activePage={activePage}
				onNavigate={(page) => navigate(pagePaths[page])}
			/>
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Root;
