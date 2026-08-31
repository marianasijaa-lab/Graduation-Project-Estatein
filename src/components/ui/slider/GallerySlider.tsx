// GallerySlider.tsx
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
interface GallerySliderProps {
  images: string[];
  propertyName?: string;
  location?: string;
  price?: number;
}

const GallerySlider = ({ images, propertyName, location, price }: GallerySliderProps) => {

  // State for tracking which image is "primary" (left) and "secondary" (right)
  const [primaryIndex, setPrimaryIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setPrimaryIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (primaryIndex + 1) % images.length;
    setPrimaryIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (primaryIndex - 1 + images.length) % images.length;
    setPrimaryIndex(prevIndex);
  };

  const secondaryIndex = (primaryIndex + 1) % images.length;

  return (
    <div className="site-container flex flex-col bg-(--bg-secondary) py-4 rounded-lg">
      {propertyName && (
        <div className="mb-4 flex flex-col gap-3 sm:hidden">
          <h1 className="text-xl font-semibold leading-tight text-(--text-main)">{propertyName}</h1>
          <div className="flex min-w-0 items-center gap-3 whitespace-nowrap">
            {location && (
              <span className="flex min-w-0 items-center gap-1.5 truncate rounded-lg border border-bg-gray-1 px-2 py-2 text-sm text-(--text-main)">
                <FaMapMarkerAlt className="shrink-0 text-(--text-main) " />
                <span className="truncate">{location}</span>
              </span>
            )}
            {price !== undefined && (
              <span className="shrink-0 text-sm text-gray">
                Price <strong className="font-semibold text-lg text-(--text-main)">${price.toLocaleString()}</strong>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Thumbnail Strip */}
      <div className="order-2 mb-4 bg-(--bg-main) p-2 overflow-hidden sm:order-none">
        <div className="flex gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`shrink-0 lg:flex-1 w-20 h-16 lg:h-20 rounded-md overflow-hidden transition-all duration-200 ${
                index === primaryIndex
                  ? "ring-2 ring-blue-500 opacity-100"
                  : "opacity-60 hover:opacity-80"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Image Display - Two Images Side by Side */}
      <div className="order-1 grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 sm:order-none">
        {/* Primary Image (Left) */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
          <img
            src={images[primaryIndex]}
            alt={`View ${primaryIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Secondary Image (Right) */}
        <div className="relative aspect-video hidden lg:block rounded-lg overflow-hidden bg-gray-800">
          <img
            src={images[secondaryIndex]}
            alt={`View ${secondaryIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="order-3 flex justify-between max-w-75 mx-auto bg-(--bg-main) p-2 rounded-full items-center gap-4 sm:order-none">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-(text-main) hover:bg-white/10 transition disabled:opacity-30"
        >
          <FaArrowLeft size={16} />
        </button>

        {/* Progress Dots */}
        <div className="flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === primaryIndex
                  ? "bg-primary w-6"
                  : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-(--text-main) hover:bg-white/10 transition disabled:opacity-30"
        >
         <FaArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default GallerySlider;

      
//   const { goNext, goPrev, itemsToShow, currentIndex, maxIndex } = useSlider(
//     propertyImages,
//     "two"
//   );

//   return (
//     <div className="w-full flex flex-col  bg-bg-dark p-12.5 rounded-lg">
//       {/* Thumbnails using BaseSlider for horizontal scroll */}
//       <div className="mb-4 order-2 flex rounded-md px-2 bg-bg-dark-1">
//         <BaseSlider currentIndex={0} itemsToShow={9}>
//           {propertyImages.map((img, index) => (
//             <div key={index} className="flex-1 px-1">
//               <img
//                 src={img}
//                 alt="property image"
//                 className={`w-full h-18.5 object-cover rounded cursor-pointer ${
//                   index === currentIndex ? "ring-2 ring-blue-500" : "opacity-60"
//                 }`}
//               />
//             </div>
//           ))}
//         </BaseSlider>
//       </div>

//       {/* Main images */}
//       <div className="grid grid-cols-1 order-3 xl:grid-cols-2 items-stretch gap-4 mb-6">
//         <div className="relative h-62 lg:h-140 xl:h-146">
//         <img src={propertyImages[currentIndex]} className="rounded-lg object-cover h-full w-full" />
//         </div>
//         <div className="relative hidden lg:block h-62 lg:h-140 xl:h-146">
          
//         <img 
//           src={propertyImages[Math.min(currentIndex + 1, propertyImages.length - 1)]} 
//           className="rounded-lg h-full object-cover w-full" 
//         />
//         </div>
      
//       </div>

//       {/* Your existing SliderButtons */}
//     <div className=" order-4">
      
//       <SliderButtons
//         currentIndex={currentIndex}
//         goNext={goNext}
//         goPrev={goPrev}
//         itemsLength={propertyImages.length}
//         maxIndex={maxIndex}
//         itemsToShow={itemsToShow}
//       />
//     </div>
//     </div>
//   );
// };