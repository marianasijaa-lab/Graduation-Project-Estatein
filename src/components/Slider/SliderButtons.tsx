import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface SliderButtonsProps {
  currentIndex: number;
  goNext: () => void;
  goPrev: () => void;
  itemsLength: number;
  maxIndex: number;
  itemsToShow: number;
}
const SliderButtons = ({
  currentIndex,
  goNext,
  goPrev,
  itemsLength,
  itemsToShow,
  maxIndex,
}: SliderButtonsProps) => {
  return (
    <>
      <div className="mt-8 lg:mt-10 border-t border-gray-200 hidden xl:flex justify-between items-center">
        <p className="pb-5 pt-4 text-gray-600">
          {currentIndex + 1} of {itemsLength - itemsToShow + 1}
        </p>

        <div className="flex gap-3">
          <button
            className="p-3 rounded-full bg-bg-card text-white hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goPrev}
            disabled={currentIndex === 0}
          >
            <FaArrowLeft size={20} />
          </button>

          <button
            className="p-3 rounded-full bg-bg-card text-white hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
          >
            <FaArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="mt-8 lg:mt-10 border-t border-gray-200 flex xl:hidden justify-between items-center">
        <button
          className="p-3 rounded-full bg-bg-card text-white hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft size={20} />
        </button>

        <p className="pb-5 pt-4 text-gray-600">
          {currentIndex + 1} of {itemsLength - itemsToShow + 1}
        </p>

        <button
          className="p-3 rounded-full bg-bg-card text-white hover:bg-opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goNext}
          disabled={currentIndex >= maxIndex}
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </>
  );
};

export default SliderButtons;
