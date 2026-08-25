import BaseSlider from "./BaseSlider";
import { useSlider } from "../../../hooks/useSlider";
import SliderButtons from "./SliderButtons";
import { properties, type Property } from "../../../data/properties";
import { motion } from "framer-motion";


interface CardProps {
  item: Property;
}

const CardsSlider = () => {
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(properties);
  return (
    <div className="w-full max-w-384 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {properties.map((card) => (
          <div
            key={card.id}
            className="flex"
            style={{ width: `${100 / itemsToShow}%`, padding: "0 12px" }}
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
  const details = [
    { icon: item.bedroomIcon, text: `${item.bedrooms}-Bedroom` },
    { icon: item.bathroomIcon, text: `${item.bathrooms}-Bathroom` },
    { icon: item.propertyTypeIcon, text: item.propertyType },
  ].filter((d) => d.icon && d.text);

  return (
    <motion.div
      whileHover={{y: -6}}
      transition={{duration: 0.25, ease: [0.25, 0.1, 0.25, 1]}}
      className="card flex flex-col gap-4 lg:gap-5 xl:gap-7.5">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />

      <div className="flex flex-col gap-5 lg:gap-6 xl:gap-7.5">
        <div className="flex flex-col gap-0.5 lg:gap-1 xl:gap-1.5">
          <h3 className="card-title">{item.name}</h3>
          <p className="font-medium line-clamp-2 text-gray">
            {item.descriptionShort} ....{" "}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {details.map((detail) => (
            <div
              key={detail.text}
              className="flex items-center gap-1 px-3.5 py-1.5 bg-(--bg-secondary) text-(--text-main) rounded-[28px] transition-colors duration-300"
            >
              <img src={detail.icon} alt={detail.text} className="w-4 h-4" />
              <p className="font-medium text-[14px]">{detail.text}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-10">
          <p className="font-semibold text-(--text-main)">
            <span className="block font-normal text-gray">Price</span> $
            {item.priceHome}
          </p>
          {/* below to be deleted when the button component is developed and created*/}
          <motion.button 
            whileHover={{scale: 1.03}}
            whileTap={{scale: 0.97}}
            className="py-3.5 px-12 rounded-lg bg-primary text-white">
            View More Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default CardsSlider;
