import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { Logo } from "./Logo";
import { useTheme } from "../../Context/ThemeContext";

// Brief and subtle — noticeably shorter than the full initial-load splash.
const TRANSITION_DURATION_MS = 800;
const REDUCED_TRANSITION_DURATION_MS = 0;

interface RouteTransitionOverlayProps {
  /** Called once the overlay has fully dismissed. */
  onTransitionEnd?: () => void;
}

// Brief animated-logo overlay shown on every in-app route change.
// Mounted separately in Root.tsx and DashboardLayout.tsx, one per route tree.
// Fixed (not absolute) so it always covers the full viewport, regardless of
// scroll position. Navbar/header stay on top via a higher z-index.
export const RouteTransitionOverlay = ({ onTransitionEnd }: RouteTransitionOverlayProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const location = useLocation();

  const [active, setActive] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const previousPathRef = useRef(location.pathname);
  const isFirstRenderRef = useRef(true);
  const onTransitionEndRef = useRef(onTransitionEnd);

  useEffect(() => {
    onTransitionEndRef.current = onTransitionEnd;
  }, [onTransitionEnd]);

  useEffect(() => {
    // Skip on mount — the full SplashScreen already covers initial load.
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      previousPathRef.current = location.pathname;
      return;
    }
    if (location.pathname === previousPathRef.current) return;
    previousPathRef.current = location.pathname;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = prefersReducedMotion ? REDUCED_TRANSITION_DURATION_MS : TRANSITION_DURATION_MS;

    if (duration === 0) {
      onTransitionEndRef.current?.();
      return;
    }

    setActive(true);
    setFadingOut(false);

    const fadeTimer = window.setTimeout(() => setFadingOut(true), Math.round(duration * 0.55));
    const removeTimer = window.setTimeout(() => {
      setActive(false);
      onTransitionEndRef.current?.();
    }, duration);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [location.pathname]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-30 flex items-center justify-center transition-opacity duration-300 ease-out ${
        fadingOut ? "opacity-0" : "opacity-100"
      } ${isDark ? "bg-bg-dark-1" : "bg-[#FAFAFA]"}`}
    >
<<<<<<< HEAD
      <Logo animated="quick" className="pointer-events-none scale-110" />
=======
      <Logo className="pointer-events-none scale-110" />
>>>>>>> cea23977333ac88dd980c41bfdf2e4e465fa5280
    </div>
  );
};
