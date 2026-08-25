import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BaseSliderProps {
    children:ReactNode,
    currentIndex:number,
    itemsToShow:number
}
const BaseSlider = ({ children, currentIndex, itemsToShow }:BaseSliderProps) => {

  const itemWidthPercent = 100 / itemsToShow;
  
  const translateX = -(currentIndex * itemWidthPercent);

  return (
    <div className="overflow-x-hidden w-full py-2 px-0">
      <motion.div 
        className="flex items-stretch my-2 transition-[transform_0.4s_ease-in-out] *:box-border *:shrink-0"
        animate={{x: `${translateX}%`}}
        transition={{duration: 0.5, ease: [0.25, 0.1, 0.25, 1]}}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default BaseSlider;