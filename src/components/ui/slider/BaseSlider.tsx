import type { ReactNode } from "react";

const GAP   = 40; // px — gap between cards
const BLEED = 36; // px — extra space on each side so box-shadows are never clipped

interface BaseSliderProps {
    children: ReactNode;
    currentIndex: number;
    itemsToShow: number;
}

/**
 * How it works:
 *
 * The visible window is exactly the parent's width.
 * We create an inner wrapper that is WIDER than the window by BLEED on each side,
 * then shift it LEFT by BLEED so it visually aligns with the parent — and the
 * overflow:hidden sits on a separate ancestor that is also WIDER by the same amount.
 *
 * Because the overflow:hidden box is permanently BLEED px wider on every side,
 * any box-shadow up to BLEED px will always be inside that box — regardless of
 * which slide is active, because the overflow boundary never moves.
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
        marginLeft:  `-${BLEED}px`,
        marginRight: `-${BLEED}px`,
        paddingLeft:  `${BLEED}px`,
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
