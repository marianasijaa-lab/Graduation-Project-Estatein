import { motion } from 'framer-motion';
import { Button } from '../../ui/Button';

interface FAQCardProps {
  question: string;
  description: string;
  onReadMore: () => void;
  index?: number;
}

export const FAQCard = ({ question, description, onReadMore, index = 0 }: FAQCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -25, x: -30 }}
      whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.15 },
        rotateY: { duration: 0.6, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] },
        x: { duration: 0.5, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] },
        y: { duration: 0.25 },
        scale: { duration: 0.25 },
      }}
      style={{ transformPerspective: 800 }}
      className="flex flex-col gap-4 bg-(--bg-main) border border-(--color-card) rounded-xl p-6 h-full">

      {/* question */}
      <h3 className="text-(--text-main) font-semibold text-[15px] sm:text-[19px] md:text-[21px] min-h-[3.5rem]">
        {question}
      </h3>

      {/* description */}
      <p className="text-gray text-[13px] sm:text-base flex-1">
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
