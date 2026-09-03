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
      <StaggerContainer className="grid w-full grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className={`${
              index === 2 ? "col-span-2 lg:col-span-1" : ""
            } w-full rounded-xl border p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden bg-(--bg-secondary) border-bg-gray-1
            }`}
          >
            <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-center">
              {stat.value}
            </h3>
            <p
              className="text-[12px] sm:text-[13px] md:text-[12px] lg:text-[15px] text-center mt-1 whitespace-nowrap leading-snug px-1 text-gray"
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default StatsBar;