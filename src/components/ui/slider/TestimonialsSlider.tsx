import { useSlider } from "../../../hooks/useSlider";
import { Button } from "../Button";
import BaseSlider from "./BaseSlider";
import SliderButtons from "./SliderButtons";
import { FaStar } from "react-icons/fa";
import { useTestimonials } from "../../../hooks/useTestimonials";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { ErrorMessage } from "../ErrorMessage";
import type { FirestoreTestimonial } from "../../../store/types";

const GAP = 24; // يجب أن يطابق قيمة GAP في BaseSlider

const TestimonialsSlider = () => {
  const { testimonials, status, error } = useTestimonials();
  const { currentIndex, goNext, goPrev, itemsToShow, maxIndex } =
    useSlider(testimonials);

  if (status === 'loading' || status === 'idle') {
    return <LoadingSkeleton variant="slider" count={3} />;
  }

  if (status === 'failed') {
    return (
      <ErrorMessage
        message={error ?? 'فشل جلب آراء العملاء'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="w-full py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex-shrink-0"
            style={{ width: `calc(${100 / itemsToShow}% - ${(GAP * (itemsToShow - 1)) / itemsToShow}px)` }}
          >
            <TestimonialCard testimony={testimonial} />
          </div>
        ))}
      </BaseSlider>
      <SliderButtons
        currentIndex={currentIndex}
        goNext={goNext}
        goPrev={goPrev}
        itemsLength={testimonials.length}
        itemsToShow={itemsToShow}
        maxIndex={maxIndex}
      >
        <Button onClick={() => {}} text="View All Testimonials" variant="secondary" />
      </SliderButtons>
    </div>
  );
};

function Star() {
  return (
    <div className="p-1.5 lg:p-2.5 rounded-full bg-bg-dark">
      <FaStar className="w-4.5 lg:w-5 xl:w-6" color="#FFE500" />
    </div>
  );
}

function TestimonialCard({ testimony }: { testimony: FirestoreTestimonial }) {
  return (
    <div className="card flex items-start flex-col gap-4 lg:gap-5 xl:gap-7.5">
      <div className="flex gap-2.5">
        {Array.from({ length: testimony.rating || 5 }, (_, index) => (
          <Star key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-1.5 lg:gap-2.5 xl:gap-3.5">
        <h3 className="font-semibold text-lg lg:text-xl 2xl:text-2xl text-white">
          {testimony.title}
        </h3>
        <p className="text-[14px] lg:text-[16px] xl:text-[18px]">
          {testimony.description}
        </p>
      </div>
      <div className="flex gap-3">
        <div>
          <img src={testimony.clientImage} alt={testimony.clientName} />
        </div>
        <div className="flex flex-col gap-0.5">
          <h4 className="xl:text-lg 2xl:text-xl text-white">{testimony.clientName}</h4>
          <p className="text-[14px] lg:text-[16px] text-gray">{testimony.clientLocation}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSlider;
