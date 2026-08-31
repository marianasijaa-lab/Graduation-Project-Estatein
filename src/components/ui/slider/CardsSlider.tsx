import BaseSlider from "./BaseSlider";
import { useSlider } from "../../../hooks/useSlider";
import SliderButtons from "./SliderButtons";
import { Button } from "../Button";
import { useNavigate } from "react-router";
import { useProperties } from "../../../hooks/useProperties";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { ErrorMessage } from "../ErrorMessage";
import type { FirestoreProperty } from "../../../store/types";
import { motion } from "framer-motion";

interface CardProps {
  item: FirestoreProperty;
}

const CardsSlider = ({
  showAll = false,
  onBack,
}: {
  showAll?: boolean;
  onBack?: () => void;
}) => {
  const { properties, status, error } = useProperties();
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(properties);

  if (status === 'loading' || status === 'idle') {
    return <LoadingSkeleton variant="slider" count={3} />;
  }

  if (status === 'failed') {
    return (
      <ErrorMessage
        message={error ?? 'فشل جلب العقارات'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (showAll) {
    return (
      <div className="py-8">
        <Button
          onClick={onBack ?? (() => {})}
          text="Back to Slider"
          variant="secondary"
          className="mb-6 rounded-xl px-5 py-3.5 text-sm"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {properties.map((card) => (
            <Card key={card.id} item={card} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {properties.map((card) => (
          <div
            key={card.id}
            className="shrink-0 flex"
            style={{ width: `calc(${100 / itemsToShow}% - ${(24 * (itemsToShow - 1)) / itemsToShow}px)` }}
          >
            <Card item={card} />
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
};

function Card({ item }: CardProps) {
  const navigate = useNavigate();
  const details = [
    { icon: item.bedroomIcon, text: `${item.bedrooms}-Bedroom` },
    { icon: item.bathroomIcon, text: `${item.bathrooms}-Bathroom` },
    { icon: item.propertyTypeIcon, text: item.propertyType },
  ].filter((d) => d.icon && d.text);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="card flex flex-col gap-4 lg:gap-5 xl:gap-7.5 bg-[#111111] border border-bg-gray-1 rounded-2xl p-4 lg:p-5 w-full h-full"
    >
      <div className="w-full h-48 sm:h-56 overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex flex-col flex-1 gap-5 lg:gap-6 xl:gap-7.5">
        <div className="flex flex-col gap-0.5 lg:gap-1 xl:gap-1.5 flex-1">
          <h3 className="card-title">{item.name}</h3>
          <p className="font-medium text-gray">
            {item.descriptionShort.length > 60
              ? item.descriptionShort.slice(0, 60) + "... "
              : item.descriptionShort + "... "}
            <button className="text-(--text-main) underline underline-offset-2 hover:text-white/80 transition-colors whitespace-nowrap">
              Read More
            </button>
          </p>
        </div>
        <div className="flex flex-nowrap gap-2 overflow-hidden">
          {details.map((detail) => (
            <div
              key={detail.text}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-(--bg-secondary) text-(--text-main) rounded-[28px] whitespace-nowrap w-fit shrink-0"
            >
              <img src={detail.icon} alt={detail.text} className="w-4 h-4 shrink-0" />
              <p className="font-medium text-xs">{detail.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold text-(--text-main)">
            <span className="block font-normal text-gray text-sm">Price</span>
            ${Number(item.priceHome).toLocaleString()}
          </p>
          <Button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate(`/property-details/${item.id}`);
            }}
            text="View Property Details"
            variant="primary"
            className="text-sm px-4 py-3 md:py-3 md:px-5"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default CardsSlider;