import React from "react";
import { useTheme } from '../../../Context/ThemeContext';
import { Link } from 'react-router';
import { motion } from "framer-motion";
import { FadeInSection } from "../../common/FadeInSection";

const MotionLink = motion(Link);

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
  bgLeftImage = "/assets/Abstract2.png",
  bgRightImage = "/assets/Abstract1.png",
  renderButton,
}) => {

    return (
        <section
            className='relative w-full overflow-hidden transition-colors py-8 sm:py-10 lg:py-14 border-b border-t border-(--color-border) bg-(--bg-main) text-(--text-main)'
        >
            <div
              className="absolute left-0 top-0 block w-full h-1/2 bg-left-top bg-no-repeat bg-auto pointer-events-none z-0 sm:hidden"
              style={{ backgroundImage: 'url(/assets/AbstractSmall.png)' }}
            />

            {bgLeftImage && (
                <div
                className="absolute left-0 top-0 hidden w-1/2 h-full bg-left bg-no-repeat bg-contain pointer-events-none z-0 sm:block"
                    style={{ backgroundImage: `url(${bgLeftImage})`,opacity: 'var(--decor-opacity)' }}
                />
            )}

            {bgRightImage && (
                <div
                    className="absolute right-0 bottom-0 w-full h-1/2 sm:w-1/2 sm:h-full bg-right bg-no-repeat bg-contain pointer-events-none z-0"
                    style={{ backgroundImage: `url(${bgRightImage})`, opacity: 'var(--decor-opacity)' }}
                />
            )}

      <FadeInSection direction="up" className="site-container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        <div className="max-w-6xl text-left lg:text-left mx-0 space-y-3">
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug">
              {title}
            </h2>
          )}
          <p
            className="text-sm sm:text-base leading-relaxed font-normal text-gray-500"
          >
            {description}
          </p>
        </div>

        <div className="shrink-0 w-full sm:w-auto flex justify-start lg:justify-end">
          {renderButton ? (
            renderButton()
          ) : (
            <MotionLink
              to="/properties"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{scale: 1.03}}
              whileTap={{scale: 0.97}}
              className="w-full px-6 py-3.5 bg-primary hover:burg-[#5e2ed9] text-white text-sm font-medium text-center rounded-xl transition-colors shadow-sm cursor-pointer sm:w-auto"
            >
              Explore Properties
            </MotionLink>
          )}
        </div>
      </FadeInSection>
    </section>
  );
};
