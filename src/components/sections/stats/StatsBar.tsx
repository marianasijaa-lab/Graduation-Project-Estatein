import { motion } from "framer-motion";
import { StaggerContainer, staggerItem } from "../../common/StaggerContainer";

interface Stat {
  value: string;
  label: string;
}

interface PropsStatsBar {
  stats: Stat[];
}

const StatsBar = ({ stats }: PropsStatsBar) =>
   {

  return (
    <div className="py-6 max-2xl:gap-4 2xl:gap-5 bg-(--bg-secondary) border-(--color-border) transition-colrs duration-300 ">
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className={`${
              index === 2 ? "col-span-2 md:col-span-1" : ""
            } rounded-xl border p-4 sm:p-6 flex flex-col items-center justify-center bg-(--bg-main) border-(--color-border) transition-colors duration-300 `}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-(--text-main)">{stat.value}</h3>
            <p className="text-[11px] sm:text-[15px] text-center mt-1 whitespace-nowrap text-gray ">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  );
};

export default StatsBar;
