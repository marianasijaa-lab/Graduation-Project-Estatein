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
      <div className="lg:hidden border-t border-bg-gray-1 flex justify-between items-center pt-4 mt-6">
        {children ? children : null}
        <div className={`flex ${children ? "" : "justify-between"} items-center gap-3`}>
          <motion.button
            whileHover={currentIndex === 0 ? undefined : { scale: 1.08 }}
            whileTap={currentIndex === 0 ? undefined : { scale: 0.92 }}
            className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            <FaArrowLeft size={16} />
          </motion.button>
          <p className="text-gray text-sm">
            <span className="text-white">{pad(currentIndex + 1)}</span>
            {" of "}
            {pad(total)}
          </p>
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
    </>
  );
};

export default SliderButtons;