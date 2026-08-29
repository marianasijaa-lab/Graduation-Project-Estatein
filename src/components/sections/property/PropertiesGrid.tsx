import { useNavigate } from "react-router";
import { Button } from "../../ui/Button";
import { useProperties } from "../../../hooks/useProperties";
import { useSlider } from "../../../hooks/useSlider";
import { LoadingSkeleton } from "../../ui/LoadingSkeleton";
import { ErrorMessage } from "../../ui/ErrorMessage";
import BaseSlider from "../../ui/slider/BaseSlider";
import SliderButtons from "../../ui/slider/SliderButtons";
import type { FirestoreProperty } from "../../../store/types";
import { motion } from "framer-motion";
import { staggerItem } from "../../common/StaggerContainer";

const GAP = 24;

export function PropertiesGrid() {
  const navigate = useNavigate();
  const { properties, status, error } = useProperties();
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
      className="card flex h-full w-full flex-col gap-4 lg:gap-5 xl:gap-7.5 bg-bg-dark-1 border border-bg-gray-1 rounded-2xl p-4 lg:p-5">
      <img
        src={item.image}
        alt={item.name}
        className="w-full aspect-16/10 object-cover rounded-xl hover:scale-105 transition-transform duration-300"
      />
      <div className="flex flex-1 flex-col gap-5 lg:gap-6 xl:gap-7.5">
        <div className="flex min-h-38 flex-col gap-0.5 lg:gap-1 xl:gap-1.5">
          {item.tag && (
            <span className="block text-gray-300 text-[13px] border border-bg-gray-1 rounded-full px-3 py-1.5 mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
              {item.tag}
            </span>
          )}
          <h3 className="card-title">{item.name}</h3>
          <p className="font-medium text-gray">
            {item.descriptionLong.length > 60
              ? item.descriptionLong.slice(0, 60) + "... "
              : item.descriptionLong + "... "}
            <button className="text-white underline underline-offset-2 hover:text-white/80 transition-colors whitespace-nowrap">
              Read More
            </button>
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4">
          <p className="font-semibold text-white">
            <span className="block font-normal text-gray text-sm">Price</span>
            ${item.priceProperties.toLocaleString()}
          </p>
          <Button
            onClick={onView}
            text="View Property Details"
            variant="primary"
            className="text-sm px-4 py-3 md:py-3 md:px-5"
          />
        </div>
      </div>
    </motion.div>
  );
}
