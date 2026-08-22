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
    <div className="overflow-hidden w-full">
      <div 
        className="flex my-2 transition-[transform_0.4s_ease-in-out] *:box-border *:shrink-0"
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseSlider;