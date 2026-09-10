import { motion } from "framer-motion";
import { StaggerContainer, staggerItem } from "../../common/StaggerContainer";

interface Stat {
  value: string;
  label: string;
}

interface PropsStatsBar {
  stats: Stat[];
}

const StatsBar = ({ stats }: PropsStatsBar) => {

  return (
    <div
      className="w-full py-6 max-2xl:gap-4 2xl:gap-5 border-bg-gray-1"
    >
      <StaggerContainer className="grid grid-cols-2 lg:flex lg:flex-nowrap gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className={`${
              index === 2 ? "col-span-2 lg:col-span-1" : ""
            } rounded-xl border p-4 sm:p-6 flex flex-col items-center lg:items-start justify-center bg-(--bg-secondary) border-bg-gray-1 lg:shrink-0`}
          >
            <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-center lg:text-left whitespace-nowrap">
              {stat.value}
            </h3>
            <p className="text-[12px] sm:text-[13px] md:text-[12px] lg:text-[15px] text-center lg:text-left mt-1 leading-snug text-gray whitespace-nowrap">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default StatsBar;