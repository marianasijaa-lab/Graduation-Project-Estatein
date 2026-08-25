import React from "react";
import { useTheme } from '../../../Context/ThemeContext';

interface CtaSectionProps {
  title?: string;
  description?: string;
  bgLeftImage?: string;
  bgRightImage?: string;
  renderButton?: () => React.ReactNode;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title = "Start Your Real Estate Journey Today",
  description = "Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.",
  bgLeftImage,
  bgRightImage,
  renderButton,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

    return (
        <section
            className={`relative w-full overflow-hidden transition-colors py-8 sm:py-10 lg:py-14 border-b border-t border-bg-gray-1 ${
                isDark ? 'bg-bg-dark-1 text-white' : 'bg-white text-gray-900'
            }`}
        >
            {bgLeftImage && (
                <div
                    className="absolute left-0 top-0 w-1/2 h-1/2 sm:h-full bg-left bg-no-repeat bg-contain pointer-events-none z-0"
                    style={{ backgroundImage: `url(${bgLeftImage})` }}
                />
            )}

            {bgRightImage && (
                <div
                    className="absolute right-0 bottom-0 w-1/2 h-1/2 sm:h-full bg-right bg-no-repeat bg-contain pointer-events-none z-0"
                    style={{ backgroundImage: `url(${bgRightImage})` }}
                />
            )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        <div className="max-w-6xl text-center lg:text-left mx-auto lg:mx-0 space-y-3">
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug">
              {title}
            </h2>
          )}
          <p
            className={`text-sm sm:text-base leading-relaxed font-normal ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {description}
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-auto flex justify-center lg:justify-end">
          {renderButton ? (
            renderButton()
          ) : (
            <button className="px-6 py-3.5 bg-primary hover:bg-[#5e2ed9] text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
              Explore Properties
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
