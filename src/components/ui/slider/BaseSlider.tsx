import type { ReactNode } from "react";

const GAP   = 24; // px — must match the card width calculations in each slider
const BLEED = 10; // px — space for card shadows without changing content width

interface BaseSliderProps {
    children: ReactNode;
    currentIndex: number;
    itemsToShow: number;
}

/**
 * How it works:
 *
 * Keep the track width aligned with the parent while giving card shadows room
 * outside the visible content area.
 */
const BaseSlider = ({ children, currentIndex, itemsToShow }: BaseSliderProps) => {
  const itemWidthPercent = 100 / itemsToShow;
  const translateX = -(currentIndex * itemWidthPercent);
  const translatePx = currentIndex * GAP;

  return (
    <div className="overflow-x-hidden w-full py-2 px-0">
      <div 
        className="flex items-stretch my-2 transition-transform duration-400 ease-in-out *:box-border *:shrink-0"
        style={{ transform: `translateX(${translateX}%)` }}
    /* Step 1: widen the clipping box permanently on both sides */
    <div
      style={{
        overflow: "hidden",
        marginLeft: `-${BLEED}px`,
        marginRight: `-${BLEED}px`,
        paddingLeft: `${BLEED}px`,
        paddingRight: `${BLEED}px`,
      }}
    >
      {/* Step 2: the moving track — width is relative to the padded container above */}
      <div
        className="flex items-stretch transition-[transform] duration-[400ms] ease-in-out *:box-border *:shrink-0"
        style={{
          gap: `${GAP}px`,
          paddingTop:    `${BLEED}px`,
          paddingBottom: `${BLEED}px`,
          transform: `translateX(calc(${translateX}% - ${translatePx}px))`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseSlider;
