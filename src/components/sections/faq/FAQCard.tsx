
import { Button } from '../../ui/Button';

interface FAQCardProps {
  question: string;
  description: string;
  onReadMore: () => void;
}

export const FAQCard = ({ question, description, onReadMore }: FAQCardProps) => {
  return (
    <div className="flex flex-col gap-4 bg-bg-dark border border-white/10 rounded-xl p-6 h-full">

      {/* question */}
      <h3 className="text-white font-semibold text-lg leading-snug">
        {question}
      </h3>

      {/* description */}
      <p className="text-gray text-sm leading-relaxed flex-1">
        {description}
      </p>

      {/* Read More button */}
      <div>
        <Button
          text="Read More"
          variant="secondary"
          onClick={onReadMore}
        />
      </div>

    </div>
  );
};
