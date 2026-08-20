import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BaseSlider from "./BaseSlider";
import { useSlider } from "../../hooks/useSlider";
import SliderButtons from "./SliderButtons";

interface Item {
  img: string;
  heading: string;
  description: string;
  details: {
    icon: string;
    text: string;
  }[];
  propertyId: number;
  price: number;
}
interface CardProps {
  item: Item;
}
const CardsSlider = () => {
  const cardsData: Item[] = [
    {
      img: "/assets/Discover1.webp",
      heading: "Seaside Serenity Villa",
      description:
        "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood",
      propertyId: 1,
      details: [
        { icon: "/assets/icon_9.png", text: "4-Bedroom" },
        { icon: "/assets/icon_7.png", text: "3-Bathroom" },
        { icon: "/assets/icon_8.png", text: "Villa" },
      ],
      price: 550000,
    },
    {
      img: "/assets/Discover2.webp",
      heading: "Metropolitan Haven",
      description:
        "A chic and fully-furnished 2-bedroom apartment with panoramic city views A chic and fully-furnished 2-bedroom apartment with panoramic city views",
      propertyId: 2,
      details: [
        { icon: "/assets/icon_9.png", text: "2-Bedroom" },
        { icon: "/assets/icon_7.png", text: "2-Bathroom" },
        { icon: "/assets/icon_8.png", text: "Villa" },
      ],
      price: 550000,
    },
    {
      img: "/assets/Discover3.webp",
      heading: "Rustic Retreat Cottage",
      description:
        "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community",
      propertyId: 3,
      details: [
        { icon: "/assets/icon_9.png", text: "3-Bedroom" },
        { icon: "/assets/icon_7.png", text: "3-Bathroom" },
        { icon: "/assets/icon_8.png", text: "Villa" },
      ],
      price: 550000,
    },
    {
      img: "/assets/Discover1.webp",
      heading: "Seaside Serenity Villa",
      description:
        "A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood A stunning 4-bedroom, 3-bathroom villa in a peaceful suburban neighborhood",
      propertyId: 4,
      details: [
        { icon: "/assets/icon_9.png", text: "4-Bedroom" },
        { icon: "/assets/icon_7.png", text: "3-Bathroom" },
        { icon: "/assets/icon_8.png", text: "Villa" },
      ],
      price: 550000,
    },
    {
      img: "/assets/Discover2.webp",
      heading: "Metropolitan Haven",
      description:
        "A chic and fully-furnished 2-bedroom apartment with panoramic city views A chic and fully-furnished 2-bedroom apartment with panoramic city views",
      propertyId: 5,
      details: [
        { icon: "/assets/icon_9.png", text: "2-Bedroom" },
        { icon: "/assets/icon_7.png", text: "2-Bathroom" },
        { icon: "/assets/icon_8.png", text: "Villa" },
      ],
      price: 550000,
    },
    {
      img: "/assets/Discover3.webp",
      heading: "Rustic Retreat Cottage",
      description:
        "An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community An elegant 3-bedroom, 2.5-bathroom townhouse in a gated community",
      propertyId: 6,
      details: [
        { icon: "/assets/icon_9.png", text: "3-Bedroom" },
        { icon: "/assets/icon 7.png", text: "3-Bathroom" },
        { icon: "/assets/icon 8.png", text: "Villa" },
      ],
      price: 550000,
    },
  ];
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(cardsData);
  return (
    <div className="w-full max-w-384 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {cardsData.map((card) => (
          <div
            key={card.propertyId}
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
        itemsLength={cardsData.length}
        itemsToShow={itemsToShow}
        maxIndex={maxIndex}
      />
    </div>
  );
};

function Card({ item }: CardProps) {
  return (
    <div className="card flex flex-col gap-4 lg:gap-5 xl:gap-7.5">
      <img
        src={item.img}
        alt={item.heading}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />

      <div className="flex flex-col gap-5 lg:gap-6 xl:gap-7.5">
        <div className="flex flex-col gap-0.5 lg:gap-1 xl:gap-1.5">
          <h3 className=" card-title">
            {item.heading}
          </h3>
          <p className="font-medium line-clamp-2 text-gray">
            {item.description} ....{" "}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.details.map((detail) => (
            <div className="flex  items-center gap-1 px-3.5 py-1.5 bg-bg-dark text-white rounded-[28px]">
              <img src={detail.icon} alt={detail.text} className="w-4 h-4" />
              <p className="font-medium text-[14px]">{detail.text}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-10">
          <p className="font-semibold text-black">
            <span className="block font-normal text-gray">Price</span> $
            {item.price}
          </p>
          {/* below to be deleted when the button component is developed and created*/}
          <button className="py-3.5 px-12 rounded-lg bg-primary text-white">
            View More Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardsSlider;
