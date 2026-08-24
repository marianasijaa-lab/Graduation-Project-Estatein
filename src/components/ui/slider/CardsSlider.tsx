import BaseSlider from "./BaseSlider";
import { useSlider } from "../../../hooks/useSlider";
import SliderButtons from "./SliderButtons";
import { properties, type Property } from "../../../Data/properties";
import { Button } from "../Button";

interface CardProps {
  item: Property;
}

const CardsSlider = () => {
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(properties);
  return (
    <div className="w-full max-w-400 mx-auto px-0 py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {properties.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0"
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
      >
        <Button onClick={()=>{}} text="View All Properties" variant="secondary"/>
      </SliderButtons>
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
    <div className="card flex flex-col gap-4 lg:gap-5 xl:gap-7.5 bg-[#111111] border border-[#262626] rounded-2xl p-4 lg:p-5">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
      />

      <div className="flex flex-col gap-5 lg:gap-6 xl:gap-7.5">
        <div className="flex flex-col gap-0.5 lg:gap-1 xl:gap-1.5">
          <h3 className="card-title">{item.name}</h3>
          <p className="font-medium text-gray">
            {item.descriptionShort.length > 60
              ? item.descriptionShort.slice(0, 60) + "... "
              : item.descriptionShort + "... "}
            <button className="text-white underline underline-offset-2 hover:text-white/80 transition-colors whitespace-nowrap">
              Read More
            </button>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {details.map((detail) => (
            <div
              key={detail.text}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-dark text-white rounded-[28px] whitespace-nowrap w-fit"
            >
              <img src={detail.icon} alt={detail.text} className="w-4 h-4 shrink-0" />
              <p className="font-medium text-xs">{detail.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="font-semibold text-white">
            <span className="block font-normal text-gray text-sm">Price</span>
            ${Number(item.priceHome).toLocaleString()}
          </p>
          <Button onClick={()=>{}} text="View Property Details" variant="primary" className="text-sm px-4 py-3  md:px-5 " />
        </div>
      </div>
    </div>
  );
}

export default CardsSlider;
