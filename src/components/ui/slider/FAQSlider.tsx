import { useSlider } from "../../../hooks/useSlider";
import BaseSlider from "./BaseSlider";
import SliderButtons from "./SliderButtons";
import { FAQCard } from "../../sections/faq/FAQCard";
import { Button } from "../Button";
import { useFAQs } from "../../../hooks/useFAQs";

const GAP = 24; // يجب أن يطابق قيمة GAP في BaseSlider

const FAQSlider = ({
  showAll = false,
  onBack,
  actionLabel = 'View All',
  onAction,
}: {
  showAll?: boolean;
  onBack?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}) => {
  const { faqs } = useFAQs();
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(faqs);

  if (showAll) {
    return (
      <div className="py-8">
        <Button
          onClick={onBack ?? (() => {})}
          text="Back to Slider"
          variant="secondary"
          className="mb-6 rounded-xl px-5 py-3.5 text-sm"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {faqs.map((card, i) => (
            <FAQCard
              key={card.id}
              index={i}
              question={card.question}
              description={card.description}
              onReadMore={() => {}}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {faqs.map((card, i) => (
          <div
            key={card.id}
            className="shrink-0"
            style={{ width: `calc(${100 / itemsToShow}% - ${(GAP * (itemsToShow - 1)) / itemsToShow}px)` }}
          >
            <FAQCard
              index={i}
              question={card.question}
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
        itemsLength={faqs.length}
        itemsToShow={itemsToShow}
        maxIndex={maxIndex}
        actionLabel={actionLabel}
        onAction={onAction}
      />
    </div>
  );
};

export default FAQSlider;
