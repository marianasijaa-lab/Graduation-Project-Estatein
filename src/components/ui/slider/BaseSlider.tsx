import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const GAP   = 24;
const BLEED = 10;

interface BaseSliderProps {
    children: ReactNode;
    currentIndex: number;
    itemsToShow: number;
}

const BaseSlider = ({ children, currentIndex, itemsToShow }: BaseSliderProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateWidth = () => setViewportWidth(viewport.clientWidth);
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(viewport);
    return () => resizeObserver.disconnect();
  }, []);

  const contentWidth = Math.max(0, viewportWidth - BLEED * 2);
  const itemWidth = contentWidth
    ? (contentWidth - GAP * (itemsToShow - 1)) / itemsToShow
    : 0;
  const translateX = -(currentIndex * (itemWidth + GAP));

  return (
    <div
      ref={viewportRef}
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
        animate={{ x: translateX }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default BaseSlider;