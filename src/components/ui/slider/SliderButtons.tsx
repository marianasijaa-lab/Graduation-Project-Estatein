import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTheme } from "../../../Context/ThemeContext";

import type { ReactNode } from "react";

interface SliderButtonsProps {
  currentIndex: number;
  goNext: () => void;
  goPrev: () => void;
  itemsLength: number;
  maxIndex: number;
  itemsToShow: number;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
  centeredMobile?: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

const SliderButtons = ({
  currentIndex,
  goNext,
  goPrev,
  itemsLength,
  itemsToShow,
  maxIndex,
  actionLabel,
  onAction,
  children,
  centeredMobile = false,
}: SliderButtonsProps) => {
  const total = itemsLength - itemsToShow + 1;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const btnStyle = isDark
    ? { background: '#1A1A1A', borderColor: '#262626', color: '#ffffff' }
    : { background: '#f4f4f5', borderColor: '#d4d4d8', color: '#71717a' };

  return (
    <>
      {/* Desktop */}
      <div className="hidden border-t border-bg-gray-1 lg:flex justify-between items-center pt-4 mt-6">
        <div className="flex items-center gap-6">
          {children ? children : null}
          <p className="text-gray text-sm">
            <span className="text-(--text-main)">{pad(currentIndex + 1)}</span>
            {" of "}
            {pad(total)}
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={currentIndex === 0 ? undefined : { scale: 1.08 }}
            whileTap={currentIndex === 0 ? undefined : { scale: 0.92 }}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={goPrev}
            disabled={currentIndex === 0}
            style={btnStyle}
          >
            <FaArrowLeft size={16} />
          </motion.button>
          <motion.button
            whileHover={currentIndex >= maxIndex ? undefined : { scale: 1.08 }}
            whileTap={currentIndex >= maxIndex ? undefined : { scale: 0.92 }}
            className="w-10 h-10 rounded-full border flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            style={btnStyle}
          >
            <FaArrowRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden border-t border-bg-gray-1 mt-6">
        {centeredMobile ? (
          /* Centered layout: arrow | number | arrow */
          <div className="flex items-center justify-between gap-3 pt-5">
            <motion.button
              whileHover={currentIndex === 0 ? undefined : { scale: 1.08 }}
              whileTap={currentIndex === 0 ? undefined : { scale: 0.92 }}
              className="w-8 h-8 rounded-full border flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={goPrev}
              disabled={currentIndex === 0}
              style={btnStyle}
            >
              <FaArrowLeft size={14} />
            </motion.button>

            <p className="text-gray text-sm whitespace-nowrap">
              <span className="text-(--text-main)">{pad(currentIndex + 1)}</span>
              {" of "}
              {pad(total)}
            </p>

            <motion.button
              whileHover={currentIndex >= maxIndex ? undefined : { scale: 1.08 }}
              whileTap={currentIndex >= maxIndex ? undefined : { scale: 0.92 }}
              className="w-8 h-8 rounded-full border flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              style={btnStyle}
            >
              <FaArrowRight size={14} />
            </motion.button>
          </div>
        ) : (
          /* Default layout */
          <div className="flex items-center justify-between gap-3 pt-5">
            {actionLabel ? (
              <button
                type="button"
                onClick={onAction}
                className="md:hidden h-11 lg:h-9 rounded-lg border border-bg-gray-1 bg-(--bg-secondary) px-3.5 text-xs font-medium text-(--text-main) whitespace-nowrap flex items-center"
              >
                {actionLabel}
              </button>
            ) : children ? (
              <div className="flex-1 min-w-0">{children}</div>
            ) : (
              <div className="flex-1 min-w-0" />
            )}

            <div className="flex items-center gap-3 ml-auto">
              <p className="text-gray text-sm whitespace-nowrap">
                <span className="text-(--text-main)">{pad(currentIndex + 1)}</span>
                {" of "}
                {pad(total)}
              </p>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={currentIndex === 0 ? undefined : { scale: 1.08 }}
                  whileTap={currentIndex === 0 ? undefined : { scale: 0.92 }}
                  className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  style={btnStyle}
                >
                  <FaArrowLeft size={14} />
                </motion.button>
                <motion.button
                  whileHover={currentIndex >= maxIndex ? undefined : { scale: 1.08 }}
                  whileTap={currentIndex >= maxIndex ? undefined : { scale: 0.92 }}
                  className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
                  onClick={goNext}
                  disabled={currentIndex >= maxIndex}
                  style={btnStyle}
                >
                  <FaArrowRight size={14} />
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SliderButtons;
