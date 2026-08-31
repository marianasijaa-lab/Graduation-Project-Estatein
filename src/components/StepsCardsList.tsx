import { motion } from "framer-motion";
import { StaggerContainer, staggerItem } from "./common/StaggerContainer";

interface StepItem {
  id: string | number;
  title: string;
  description: string;
}

interface StepsCardsListProps {
  steps: StepItem[];
}

export const StepsCardsList = ({ steps }: StepsCardsListProps) => {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-sm:gap-[30px] max-2xl:gap-10 2xl:gap-[50px]">
      {steps.map((step, index) => (
        <motion.div
          variants={staggerItem}
          key={step.id}
          className={`flex-col relative h-full ${index >= 3 ? 'hidden sm:flex' : 'flex'}`}
        >
          {/* قسم الـ Step العلوي */}
          <div className="relative pb-[14px] pl-4 2xl:pl-[20px] 2xl:pb-4 flex items-center">

            {/* الخط الشاقولي الأيسر — يبدأ من top-0 */}
            <div className="absolute left-0 top-0 h-full w-[2px] bg-primary"></div>

            {/* الخط الأفقي — يبدأ من left-0 عند bottom-0 */}
            <div className="absolute left-0 bottom-0 w-[180px] h-[2px] bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>

            {/* نص Step */}
            <span className="text-(--text-main) 2xl:text-xl text-base font-medium tracking-wide">
              Step {step.id}
            </span>
          </div>

          {/* صندوق الكارد السفلي — بدون border-t وبدون border-l */}
          <div className="flex-1 max-w-[512.33px] max-sm:p-[30px] max-2xl:p-10 2xl:p-[50px] border border-t-0 border-l-0 border-bg-gray-1 rounded-[10px] rounded-tl-none flex flex-col max-sm:gap-[14px] max-2xl:gap-4 2xl:gap-5 shadow-2xl relative overflow-hidden">

            {/* الخط الشاقولي الأيسر للكارد — يكمل من أعلى الكارد */}
            <div className="absolute left-0 top-0 h-1/2 w-[2px] bg-gradient-to-b from-primary to-transparent z-10"></div>

            {/* الوهج البنفسجي */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-primary/25 via-primary/5 to-transparent pointer-events-none rounded-tl-2xl blur-sm"></div>

            <h3 className="text-(--text-main) max-sm:text-lg max-2xl:text-xl 2xl:text-2xl font-semibold">
              {step.title}
            </h3>
            <p className="text-gray max-sm:text-sm max-2xl:text-base 2xl:text-lg font-medium leading-relaxed">
              {step.description}
            </p>
          </div>

        </motion.div>
      ))}
    </StaggerContainer>
  );
};
