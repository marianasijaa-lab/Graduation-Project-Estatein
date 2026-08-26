import { Button } from '../../ui/Button';

interface FAQCardProps {
  question: string;
  description: string;
  onReadMore: () => void;
}

export const FAQCard = ({ question, description, onReadMore }: FAQCardProps) => {
  return (
    <div className="flex flex-col gap-4 bg-bg-dark-1 border border-white/10 rounded-xl p-6 h-full transition-colors duration-300">
      {/* question */}
      <h3 className="text-white font-semibold text-[19px] min-h-[3.5rem]">
        {question}
      </h3>

      {/* description */}
      <p className="text-gray text-base flex-1">
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