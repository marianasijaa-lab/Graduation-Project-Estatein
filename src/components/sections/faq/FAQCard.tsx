import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';
import { staggerItem } from '../../common/StaggerContainer';

interface FAQCardProps {
  question: string;
  description: string;
  onReadMore: () => void;
}

export const FAQCard = ({ question, description, onReadMore }: FAQCardProps) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{y: -4}}
      transition={{duration: 0.25}}
      className="flex flex-col gap-4 bg-(--bg-main) border border-(--color-card) rounded-xl p-6 h-full">

      {/* question */}
      <h3 className="text-(--text-main) font-semibold text-[19px] min-h-[3.5rem]">
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
          className="w-full md:w-auto md:px-[18px] md:py-[12px] md:text-[16px] max-sm:text-[14px]"
        />
      </div>

    </motion.div>
  );
};
