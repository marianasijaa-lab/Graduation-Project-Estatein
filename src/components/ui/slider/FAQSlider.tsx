import { useSlider } from "../../../hooks/useSlider";
import BaseSlider from "./BaseSlider";
import SliderButtons from "./SliderButtons";
import { FAQCard } from "../../sections/faq/FAQCard";
import { Button } from "../Button";

const GAP = 24; // يجب أن يطابق قيمة GAP في BaseSlider

interface FAQItem {
  id: number;
  title: string;
  description: string;
}

const FAQData: FAQItem[] = [
  {
    id: 1,
    title: "How do I search for properties on Estatein?",
    description:
      "Learn how to use our user-friendly search tools to find properties that match your criteria.",
  },
  {
    id: 2,
    title: "What documents do I need to sell my property through Estatein?",
    description:
      "Find out about the necessary documentation for listing your property with us.",
  },
  {
    id: 3,
    title: "How can I contact an Estatein agent?",
    description:
      "Discover the different ways you can get in touch with our experienced agents.",
  },
  {
    id: 4,
    title: "What documents do I need to sell my property through Estatein?",
    description:
      "Find out about the necessary documentation for listing your property with us.",
  },
  {
    id: 5,
    title: "How can I contact an Estatein agent?",
    description:
      "Discover the different ways you can get in touch with our experienced agents.",
  },
];

const FAQSlider = () => {
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(FAQData);

  return (
    <div className="w-full py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {FAQData.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0"
            style={{ width: `calc(${100 / itemsToShow}% - ${(GAP * (itemsToShow - 1)) / itemsToShow}px)` }}
          >
            <FAQCard
              question={card.title}
              description={card.description}
              onReadMore={() => {}}
            />
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
      >
         <Button onClick={()=>{}} text="View All FAQ's" variant="secondary"/>
      </SliderButtons>
    </div>
  );
};

export default FAQSlider;
