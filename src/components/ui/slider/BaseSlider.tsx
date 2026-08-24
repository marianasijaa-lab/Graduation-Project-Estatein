import type { ReactNode } from "react";

const GAP = 24; // px

interface BaseSliderProps {
    children:ReactNode,
    currentIndex:number,
    itemsToShow:number
}
const BaseSlider = ({ children, currentIndex, itemsToShow }:BaseSliderProps) => {

  const itemWidthPercent = 100 / itemsToShow;

  // Each card is (100/itemsToShow)% wide minus its share of the gaps
  // gaps per view = itemsToShow - 1, each card bears (itemsToShow-1)/itemsToShow of the gap
  const gapOffset = (GAP * (itemsToShow - 1)) / itemsToShow;

  const translateX = -(currentIndex * itemWidthPercent);
  const translatePx = currentIndex * GAP;

  return (
    <div className="overflow-x-hidden w-full py-2 px-0">
      <div
        className="flex items-stretch my-2 transition-[transform_0.4s_ease-in-out] *:box-border *:shrink-0"
        style={{
          gap: `${GAP}px`,
          transform: `translateX(calc(${translateX}% - ${translatePx}px))`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseSlider;