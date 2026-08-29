import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { useTheme } from "../../Context/ThemeContext";

// How long the splash stays fully visible before fading out.
const DISPLAY_DURATION_MS = 2400;

// Must match the fade-out's Tailwind duration class below.
const FADE_DURATION_MS = 600;

// Shortened timings for prefers-reduced-motion.
const REDUCED_DISPLAY_DURATION_MS = 200;
const REDUCED_FADE_DURATION_MS = 0;

interface SplashScreenProps {
  children: ReactNode;
}

// Full-screen brand splash shown once on initial load, for every route.

export const SplashScreen = ({ children }: SplashScreenProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const displayDuration = prefersReducedMotion ? REDUCED_DISPLAY_DURATION_MS : DISPLAY_DURATION_MS;
    const fadeDuration = prefersReducedMotion ? REDUCED_FADE_DURATION_MS : FADE_DURATION_MS;

    const fadeTimer = window.setTimeout(() => setFadingOut(true), displayDuration);
    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      // Focus the real content once the splash is gone.
      contentRef.current?.focus();
    }, displayDuration + fadeDuration);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {visible && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 transition-opacity duration-[600ms] ease-out ${
            fadingOut ? "opacity-0" : "opacity-100"
          } ${isDark ? "bg-bg-dark-1" : "bg-[#FAFAFA]"}`}
        >
          <div className={isDark ? "text-white" : "text-zinc-900"}>
            <Logo animated="full" className="pointer-events-none scale-125 sm:scale-150" />
          </div>

          <div
            className={`w-40 h-1 rounded-full overflow-hidden ${isDark ? "bg-bg-gray-1" : "bg-gray-200"}`}
          >
            <div className="h-full bg-primary rounded-full animate-splash-progress" />
          </div>
        </div>
      )}

      {/* Keep the real page out of the tab order until the splash is gone. */}
      <div ref={contentRef} tabIndex={-1} className="outline-none" aria-hidden={visible || undefined} inert={visible || undefined}>
        {children}
      </div>
    </>
  );
};
