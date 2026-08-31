import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
}: SliderButtonsProps) => {
  const total = itemsLength - itemsToShow + 1;

  return (
    <>
      {/* Desktop */}
      <div className="hidden border-t border-bg-gray-1 lg:flex justify-between items-center pt-4 mt-6">
        <div className="flex items-center gap-6">
          {children ? children : null}
          <p className="text-gray text-sm">
            <span className="text-white">{pad(currentIndex + 1)}</span>
            {" of "}
            {pad(total)}
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={currentIndex === 0 ? undefined : { scale: 1.08 }}
            whileTap={currentIndex === 0 ? undefined : { scale: 0.92 }}
            className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            <FaArrowLeft size={16} />
          </motion.button>
          <motion.button
            whileHover={currentIndex >= maxIndex ? undefined : { scale: 1.08 }}
            whileTap={currentIndex >= maxIndex ? undefined : { scale: 0.92 }}
            className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
          >
            <FaArrowRight size={16} />
          </motion.button>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden border-t border-bg-gray-1 mt-6">
        <div className="flex items-center justify-between gap-3 pt-5">
        {actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="h-11 lg:h-9 rounded-lg border border-bg-gray-1 bg-[#1A1A1A] px-3.5 text-xs font-medium text-white whitespace-nowrap flex items-center"
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
            <span className="text-white">{pad(currentIndex + 1)}</span>
            {" of "}
            {pad(total)}
          </p>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={currentIndex === 0 ? undefined : { scale: 1.08 }}
              whileTap={currentIndex === 0 ? undefined : { scale: 0.92 }}
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={goPrev}
              disabled={currentIndex === 0}
            >
              <FaArrowLeft size={14} />
            </motion.button>
            <motion.button
              whileHover={currentIndex >= maxIndex ? undefined : { scale: 1.08 }}
              whileTap={currentIndex >= maxIndex ? undefined : { scale: 0.92 }}
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
            >
              <FaArrowRight size={14} />
            </motion.button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default SliderButtons;