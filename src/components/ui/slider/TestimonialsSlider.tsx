import { useSlider } from "../../../hooks/useSlider";
import { Button } from "../Button";
import BaseSlider from "./BaseSlider";
import SliderButtons from "./SliderButtons";
import { FaStar } from "react-icons/fa";
import { useTestimonials } from "../../../hooks/useTestimonials";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { ErrorMessage } from "../ErrorMessage";
import type { FirestoreTestimonial } from "../../../store/types";
import { motion } from "framer-motion";

const GAP = 24;

const TestimonialsSlider = ({
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
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimony={testimonial} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <BaseSlider currentIndex={currentIndex} itemsToShow={itemsToShow}>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="h-full flex-shrink-0"
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
        actionLabel={actionLabel}
        onAction={onAction}
      />
    </div>
  );
};

function Star() {
  return (
    <div className="p-1.5 lg:p-2.5 rounded-full bg-(--bg-secondary)">
      <FaStar className="w-4.5 lg:w-5 xl:w-6" color="#FFE500" />
    </div>
  );
}

function TestimonialCard({ testimony }: { testimony: FirestoreTestimonial }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="card flex h-auto md:h-[340px] lg:h-[370px] w-full flex-col items-stretch gap-3 sm:gap-4 lg:gap-5 overflow-hidden"
    >
      <div className="flex gap-1.5 sm:gap-2.5">
        {Array.from({ length: testimony.rating || 5 }, (_, index) => (
          <Star key={index} />
        ))}
      </div>

      <div className="flex flex-col gap-1.5 lg:gap-2.5 flex-1 min-h-0">
        <h3 className="font-semibold text-lg md:text-xl lg:text-xl 2xl:text-2xl text-(--text-main)">
          {testimony.title}
        </h3>
        <p className="text-[12px] leading-relaxed md:text-[14px] lg:text-[14px] xl:text-[15.8px] md:line-clamp-3 lg:line-clamp-4">
          {testimony.description}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-3 sm:gap-4">
        <div className="shrink-0 overflow-hidden rounded-full border border-bg-gray-1 bg-bg-dark">
          <img
            src={testimony.clientImage}
            alt={testimony.clientName}
            className="h-12 w-12 object-cover sm:h-14 sm:w-14"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h4 className="text-base font-medium text-(--text-main) sm:text-lg md:text-lg xl:text-xl whitespace-nowrap">{testimony.clientName}</h4>
          <p className="text-[13px] text-gray sm:text-[14px] md:text-[15px] lg:text-[16px]">{testimony.clientLocation}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default TestimonialsSlider;