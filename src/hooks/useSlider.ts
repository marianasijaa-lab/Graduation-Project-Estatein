import { useEffect, useState } from "react";

export const useSlider=(data:any[])=>{
 const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3); // Default for large screens

  // 2. Simple resize listener to handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768)
        setItemsToShow(1); // Mobile
      else if (width < 1024)
        setItemsToShow(2); // Tablet
      else setItemsToShow(3); // Desktop
    };

    handleResize(); // Set initial value on mount
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 3. Calculate the maximum index so we don't slide past the last item
  const maxIndex = Math.max(0, data.length - itemsToShow);

  const goNext = () => {
    // Loops back to 0 when reaching the end (or use Math.min to just stop)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    // Loops to the end when at the start (or use Math.max to just stop)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };
  return {goNext,goPrev,itemsToShow,currentIndex,maxIndex}
}