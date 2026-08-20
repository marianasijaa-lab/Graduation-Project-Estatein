import { useSlider } from "../../hooks/useSlider";
import BaseSlider from "./BaseSlider";
import SliderButtons from "./SliderButtons";

interface FAQCardProps {
  id?: number;
  title: string;
  description: string;
}
const FAQSlider = () => {
  const FAQData: FAQCardProps[] = [
    {
      title: "How do I search for properties on Estatein?",
      id: 1,
      description:
        "Learn how to use our user-friendly search tools to find properties that match your criteria.",
    },
    {
      title: "What documents do I need to sell my property through Estatein?",
      id: 2,
      description:
        "Find out about the necessary documentation for listing your property with us.",
    },
    {
      title: "How can I contact an Estatein agent?",
      id: 3,
      description:
        "Discover the different ways you can get in touch with our experienced agents.",
    },
    {
      title: "What documents do I need to sell my property through Estatein?",
      id: 4,
      description:
        "Find out about the necessary documentation for listing your property with us.",
    },
    {
      title: "How can I contact an Estatein agent?",
      id: 5,
      description:
        "Discover the different ways you can get in touch with our experienced agents.",
    },
  ];
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(FAQData);
  return (
    <div className="w-full max-w-384 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {FAQData.map((card) => (
          <div
            key={card.id}
            className="flex"
            style={{ width: `${100 / itemsToShow}%`, padding: "0 12px" }}
          >
            <FAQCard description={card.description} title={card.title} />
          </div>
        ))}
      </BaseSlider>
      <SliderButtons
        currentIndex={currentIndex}
        goNext={goNext}
        goPrev={goPrev}
        itemsLength={FAQData.length}
        itemsToShow={itemsToShow}
        maxIndex={maxIndex}
      />
    </div>
  );
};

function FAQCard({ description, title }: FAQCardProps) {
  return (
    <div className="card flex items-start flex-col gap-4 lg:gap-5 xl:gap-7.5">
      <h2 className="card-title text-lg lg:text-xl max-w-103">{title}</h2>
      <p className="font-medium text-gray max-w-103">{description}</p>
      <button className="px-6 py-4.5 rounded-lg bg-bg-card text-white">Read More</button>
    </div>
  );
}

export default FAQSlider;
