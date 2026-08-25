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
    <div
      style={{
        overflow: "hidden",
        marginLeft: `-${BLEED}px`,
        marginRight: `-${BLEED}px`,
        paddingLeft: `${BLEED}px`,
        paddingRight: `${BLEED}px`,
      }}
    >
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
