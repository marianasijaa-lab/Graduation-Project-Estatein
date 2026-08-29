import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { RouteTransitionOverlay } from "../common/RouteTransitionOverlay";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineArrowTrendingUp,
  HiOutlineBuildingOffice2,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronDown,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineIdentification,
  HiOutlineInbox,
  HiOutlineInformationCircle,
  HiOutlineKey,
  HiOutlineMapPin,
  HiOutlineNewspaper,
  HiOutlineQuestionMarkCircle,
  HiOutlineSparkles,
  HiOutlineTrophy,
  HiOutlineUserGroup,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";
import type { IconType } from "react-icons";
import { Logo } from "../common/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import { useTheme } from "../../Context/ThemeContext";
import { useAuth } from "../../Context/AuthContext";

interface DashboardSectionItem {
  label: string;
  to: string;
  icon: IconType;
}

interface DashboardPageGroup {
  /** Also used as the expand/collapse key. */
  label: string;
  icon: IconType;
  sections: DashboardSectionItem[];
}

// Sidebar groups, by site page.
const NAV_GROUPS: DashboardPageGroup[] = [
  {
    label: "Home",
    icon: HiOutlineHome,
    sections: [
      { label: "Properties", to: "/dashboard/properties", icon: HiOutlineBuildingOffice2 },
      { label: "Testimonials", to: "/dashboard/testimonials", icon: HiOutlineChatBubbleLeftRight },
      { label: "FAQ", to: "/dashboard/faqs", icon: HiOutlineQuestionMarkCircle },
    ],
  },
  {
    label: "About Us",
    icon: HiOutlineInformationCircle,
    sections: [
      { label: "Our Values", to: "/dashboard/values", icon: HiOutlineSparkles },
      { label: "Our Achievements", to: "/dashboard/achievements", icon: HiOutlineTrophy },
      { label: "Our Valued Clients", to: "/dashboard/clients", icon: HiOutlineUserGroup },
    ],
  },
  {
    label: "Services",
    icon: HiOutlineWrenchScrewdriver,
    sections: [
      { label: "Unlock Property Value", to: "/dashboard/unlock-property-value", icon: HiOutlineKey },
      { label: "Effortless Property Management", to: "/dashboard/effortless-property-management", icon: HiOutlineHomeModern },
      { label: "Smart Investments", to: "/dashboard/smart-investments", icon: HiOutlineArrowTrendingUp },
    ],
  },
  {
    label: "Contact",
    icon: HiOutlineEnvelope,
    sections: [
      { label: "Offices", to: "/dashboard/offices", icon: HiOutlineMapPin },
      { label: "Inquiries", to: "/dashboard/inquiries", icon: HiOutlineInbox },
      { label: "Contact Info", to: "/dashboard/contact-info", icon: HiOutlineIdentification },
      { label: "Subscribers", to: "/dashboard/subscribers", icon: HiOutlineNewspaper },
    ],
  },
];

const ALL_SECTIONS = NAV_GROUPS.flatMap((group) => group.sections);

function groupIdFor(label: string): string {
  return `dashboard-nav-group-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

function findActiveGroupLabel(pathname: string): string | null {
  const group = NAV_GROUPS.find((g) => g.sections.some((s) => pathname.startsWith(s.to)));
  return group?.label ?? null;
}

function useActiveSectionLabel(): string {
  const location = useLocation();
  const match = ALL_SECTIONS.find((item) => location.pathname.startsWith(item.to));
  return match?.label ?? "Dashboard";
}

interface SidebarLinksProps {
  isDark: boolean;
  expandedGroups: Set<string>;
  onToggleGroup: (label: string) => void;
  onNavigate?: () => void;
}

const SidebarLinks = ({ isDark, expandedGroups, onToggleGroup, onNavigate }: SidebarLinksProps) => (
  <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
    {NAV_GROUPS.map((group) => {
      const GroupIcon = group.icon;
      const isExpanded = expandedGroups.has(group.label);
      const panelId = groupIdFor(group.label);

      return (
        <div key={group.label}>
          <button
            type="button"
            onClick={() => onToggleGroup(group.label)}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <GroupIcon className="w-5 h-5 shrink-0" />
            <span className="flex-1 text-left truncate">{group.label}</span>
            <HiOutlineChevronDown
              aria-hidden="true"
              className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>

          {isExpanded && (
            <div
              id={panelId}
              className={`mt-1 ml-4 pl-4 flex flex-col gap-1 border-l ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}
            >
              {group.sections.map((section) => {
                const SectionIcon = section.icon;
                return (
                  <NavLink
                    key={section.to}
                    to={section.to}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary text-white"
                          : isDark
                            ? "text-gray hover:bg-bg-gray-1 hover:text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`
                    }
                  >
                    <SectionIcon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{section.label}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      );
    })}
  </nav>
);

export const DashboardLayout = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const sectionLabel = useActiveSectionLabel();
  const mainRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const activeGroupLabel = findActiveGroupLabel(location.pathname);

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(activeGroupLabel ? [activeGroupLabel] : []),
  );

  // Auto-expand the group of the active section.
  useEffect(() => {
    if (!activeGroupLabel) return;
    setExpandedGroups((prev) => (prev.has(activeGroupLabel) ? prev : new Set(prev).add(activeGroupLabel)));
  }, [activeGroupLabel]);

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  // Signs the user out; AuthGate takes it from here and shows the login screen.
  const handleLogout = () => {
    setMobileNavOpen(false);
    void logout();
  };

  const shellClass = isDark ? "bg-bg-dark-1 text-white" : "bg-gray-50 text-zinc-900";
  const sidebarClass = isDark ? "bg-bg-dark border-bg-gray-1" : "bg-white border-gray-200";
  const headerClass = isDark ? "bg-bg-dark-1 border-bg-gray-1" : "bg-white border-gray-200";

  return (
    <div className={`min-h-screen ${shellClass} font-['Urbanist',sans-serif]`}>
      {/* ── Desktop sidebar (fixed) ── */}
      <aside
        className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:flex-col lg:z-40 border-r ${sidebarClass}`}
      >
        <div className={`flex items-center justify-between px-5 h-20 border-b ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <Link to="/" aria-label="Back to Estatein website">
            <Logo />
          </Link>
        </div>
        <p className={`px-6 pt-4 text-xs font-semibold uppercase tracking-wider ${isDark ? "text-gray" : "text-gray-400"}`}>
          Admin Dashboard
        </p>
        <SidebarLinks
          isDark={isDark}
          expandedGroups={expandedGroups}
          onToggleGroup={toggleGroup}
        />
        <div className={`px-3 py-4 border-t space-y-1 ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
          <Link
            to="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            ← Back to website
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
              isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar (overlay drawer) ── */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <aside className={`absolute inset-y-0 left-0 w-72 max-w-[80vw] flex flex-col border-r ${sidebarClass}`}>
            <div className={`flex items-center justify-between px-5 h-20 border-b ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
              <Link to="/" aria-label="Back to Estatein website" onClick={() => setMobileNavOpen(false)}>
                <Logo />
              </Link>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
                className={`p-2 rounded-lg cursor-pointer ${isDark ? "text-white hover:bg-bg-gray-1" : "text-gray-700 hover:bg-gray-100"}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className={`px-6 pt-4 text-xs font-semibold uppercase tracking-wider ${isDark ? "text-gray" : "text-gray-400"}`}>
              Admin Dashboard
            </p>
            <SidebarLinks
              isDark={isDark}
              expandedGroups={expandedGroups}
              onToggleGroup={toggleGroup}
              onNavigate={() => setMobileNavOpen(false)}
            />
            <div className={`px-3 py-4 border-t space-y-1 ${isDark ? "border-bg-gray-1" : "border-gray-200"}`}>
              <Link
                to="/"
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                ← Back to website
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                  isDark ? "text-gray hover:bg-bg-gray-1 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                Log Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main column ── */}
      <div className="lg:ml-72">
        <header className={`sticky top-0 z-40 h-20 flex items-center justify-between gap-4 px-4 sm:px-8 border-b ${headerClass}`}>
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              className={`lg:hidden p-2.5 rounded-xl border cursor-pointer ${
                isDark ? "border-bg-gray-1 text-white" : "border-gray-200 text-gray-700"
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold truncate">{sectionLabel}</h1>
          </div>
          <ThemeToggle />
        </header>

        <RouteTransitionOverlay onTransitionEnd={() => mainRef.current?.focus()} />

        <main ref={mainRef} tabIndex={-1} className="p-4 sm:p-6 lg:p-8 outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
