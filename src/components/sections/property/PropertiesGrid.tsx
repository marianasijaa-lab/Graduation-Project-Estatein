import { useNavigate } from "react-router";
import { Button } from "../../ui/Button";
import { useSlider } from "../../../hooks/useSlider";
import { LoadingSkeleton } from "../../ui/LoadingSkeleton";
import { ErrorMessage } from "../../ui/ErrorMessage";
import BaseSlider from "../../ui/slider/BaseSlider";
import SliderButtons from "../../ui/slider/SliderButtons";
import type { DataStatus, FirestoreProperty } from "../../../store/types";
import { motion } from "framer-motion";
import { staggerItem } from "../../common/StaggerContainer";
interface PropertiesGridProps{
  properties:FirestoreProperty[],
  status:DataStatus,
  error:string |null
}
const GAP = 24;

export function PropertiesGrid({error,status,properties}:PropertiesGridProps) {
  const navigate = useNavigate();
  // const { properties, status, error } = useProperties();
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(properties);

  if (status === 'loading' || status === 'idle') {
    return <LoadingSkeleton variant="grid" count={3} />;
  }
  if (status === 'failed') {
    return (
      <ErrorMessage
        message={error ?? 'فشل جلب العقارات'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="w-full">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {properties.map((item) => (
          <div
            key={item.id}
            className="shrink-0 flex"
            style={{ width: `calc(${100 / itemsToShow}% - ${(GAP * (itemsToShow - 1)) / itemsToShow}px)` }}
          >
            <PropertyCard
              item={item}
              onView={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(`/property-details/${item.id}`);
              }}
            />
          </div>
        ))}
      </BaseSlider>
      <SliderButtons
        currentIndex={currentIndex}
        goNext={goNext}
        goPrev={goPrev}
        itemsLength={properties.length}
        itemsToShow={itemsToShow}
        maxIndex={maxIndex}
      />
    </div>
  );
}

function PropertyCard({
  item,
  onView,
}: {
  item: FirestoreProperty;
  onView: () => void;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{y: -6}}
      transition={{duration: 0.25, ease: [0.25, 0.1, 0.25, 1]}}
      className="card flex h-full w-full flex-col gap-4 lg:gap-5 xl:gap-7.5 bg-(--bg-main) border border-bg-gray-1 rounded-2xl p-4 lg:p-5">
      <img
        src={item.image}
        alt={item.name}
        className="w-full aspect-16/10 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
      />
      <div className="flex flex-1 flex-col gap-3 lg:gap-6 xl:gap-7.5">
        <div className="flex flex-col gap-0.5 lg:gap-1 xl:gap-1.5 lg:min-h-38">
          {item.tag && (
            <span className=" w-fit block text-white text-[12px] md:text-[13px] border border-bg-gray-1 rounded-full px-3 py-1.5 mb-1 whitespace-nowrap overflow-hidden text-ellipsis bg-bg-dark">
              {item.tag}
            </span>
          )}
          <h3 className="card-title">{item.name}</h3>
          <p className="font-medium text-gray text-[14px] sm:text-base">
            {item.descriptionLong.length > 60
              ? item.descriptionLong.slice(0, 60) + "... "
              : item.descriptionLong + "... "}
            <button className="text-(--text-main) underline underline-offset-2 hover:text-white/80 transition-colors whitespace-nowrap">
              Read More
            </button>
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4">
          <p className="font-semibold text-(--text-main)">
            <span className="block font-normal text-gray text-sm">Price</span>
           <span className=" font-semibold text-white text-[15px] md:text-[18px] lg:text-2xl whitespace-nowrap"> ${item.priceProperties.toLocaleString()}</span>
          </p>
          <Button
            onClick={onView}
            text="View Property Details"
            variant="primary"
            className="text-[11px]  md:text-[13px] lg:text-sm px-3 py-2 md:px-4 md:py-3 lg:py-4 lg:px-5 max-w-[210px]"
          />
        </div>
      </div>
    </motion.div>
  );
}
