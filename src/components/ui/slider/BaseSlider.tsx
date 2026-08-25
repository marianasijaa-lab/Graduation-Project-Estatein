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
      <div 
        className="flex items-stretch my-2 transition-transform duration-400 ease-in-out *:box-border *:shrink-0"
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseSlider;