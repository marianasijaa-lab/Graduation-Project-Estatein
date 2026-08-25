import { motion, scale } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface SliderButtonsProps {
  currentIndex: number;
  goNext: () => void;
  goPrev: () => void;
  itemsLength: number;
  maxIndex: number;
  itemsToShow: number;
}

const pad = (n: number) => String(n).padStart(2, "0");

const SliderButtons = ({
  currentIndex,
  goNext,
  goPrev,
  itemsLength,
  itemsToShow,
  maxIndex,
}: SliderButtonsProps) => {
  const total = itemsLength - itemsToShow + 1;

  return (
    <div className="border-t border-(--color-border) flex justify-between items-center pt-4 mt-6 transition-colors duration-300">
      {/* Counter */}
      <p className="text-gray text-sm">
        <span className="text-(--text-main)">{pad(currentIndex + 1)}</span>
        {" of "}
        {pad(total)}
      </p>

      {/* Arrow Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={currentIndex === 0 ? undefined : {scale: 1.08}}
          whileTap={currentIndex === 0 ? undefined : {scale: 0.92}}
          className="w-10 h-10 rounded-full border border-(--color-border) flex items-center justify-center text-(--text-main) hover:bg-(--text-main)/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft size={16} />
        </motion.button>
        <motion.button
          whileHover={currentIndex >= maxIndex ? undefined : {scale: 1.08}}
          whileTap={currentIndex >= maxIndex ? undefined : {scale: 0.92}}
          className="w-10 h-10 rounded-full border border-(--color-border) flex items-center justify-center text-(--text-main) hover:bg-(--text-main)/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={goNext}
          disabled={currentIndex >= maxIndex}
        >
          <FaArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
};

export default SliderButtons;
