import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import type { ReactNode } from "react";

interface SliderButtonsProps {
  currentIndex: number;
  goNext: () => void;
  goPrev: () => void;
  itemsLength: number;
  maxIndex: number;
  itemsToShow: number;
  children?:ReactNode
}

const pad = (n: number) => String(n).padStart(2, "0");

const SliderButtons = ({
  currentIndex,
  goNext,
  goPrev,
  itemsLength,
  itemsToShow,
  maxIndex,
  children,
}: SliderButtonsProps) => {
  const total = itemsLength - itemsToShow + 1;

  return (
    <>
    <div className=" hidden border-t border-bg-gray-1 lg:flex justify-between items-center pt-4 mt-6">
      {/* Counter */}
      <p className="text-gray text-sm">
        <span className="text-white">{pad(currentIndex + 1)}</span>
        {" of "}
        {pad(total)}
      </p>

      {/* Arrow Buttons */}
      <div className="flex gap-3">
        <button
          className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft size={16} />
        </button>
        <button
          className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={goNext}
          disabled={currentIndex >= maxIndex}
        >
          <FaArrowRight size={16} />
        </button>
      </div>
    </div>
     <div className=" lg:hidden border-t border-bg-gray-1 flex justify-between items-center pt-4 mt-6">
     {children?children :null}
      {/* Arrow Buttons */}
      <div className={`  flex  ${children ? "" :"justify-between"} items-center gap-3`}>
        <button
          className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft size={16} />
        </button>
         <p className="text-gray text-sm">
        <span className="text-white">{pad(currentIndex + 1)}</span>
        {" of "}
        {pad(total)}
      </p> 
        <button
          className="w-10 h-10 rounded-full border border-bg-gray-1 flex items-center justify-center text-white hover:bg-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          onClick={goNext}
          disabled={currentIndex >= maxIndex}
        >
          <FaArrowRight size={16} />
        </button>
      </div>
     
     </div>
    </>
  );
};

export default SliderButtons;
