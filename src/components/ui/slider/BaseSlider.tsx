import { motion } from "framer-motion";
import type { ReactNode } from "react";

const GAP   = 24;
const BLEED = 10;

interface BaseSliderProps {
    children: ReactNode;
    currentIndex: number;
    itemsToShow: number;
}

const BaseSlider = ({ children, currentIndex, itemsToShow }: BaseSliderProps) => {
  const itemWidthPercent = 100 / itemsToShow;
  const translateX = -(currentIndex * itemWidthPercent);
  const translatePx = currentIndex * GAP;

  return (
    <div
      style={{
        overflow: "hidden",
        marginLeft: `-${BLEED}px`,
        marginRight: `-${BLEED}px`,
        paddingLeft: `${BLEED}px`,
        paddingRight: `${BLEED}px`,
      }}
    >
      <motion.div
        className="flex items-stretch *:box-border *:shrink-0"
        style={{
          gap: `${GAP}px`,
          paddingTop:    `${BLEED}px`,
          paddingBottom: `${BLEED}px`,
        }}
        animate={{ x: `calc(${translateX}% - ${translatePx}px)` }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default BaseSlider;