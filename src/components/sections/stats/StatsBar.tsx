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
<<<<<<< HEAD
      className="py-6 max-2xl:gap-4 2xl:gap-5 border-bg-gray-1"
=======
      className={`w-full py-6 max-2xl:gap-4 2xl:gap-5 ${
        theme === "dark"
          ? " border-bg-gray-1"
          : "bg-gray-50 border-gray-300"
      }`}
>>>>>>> main
    >
      <StaggerContainer className="grid w-full grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className={`${
<<<<<<< HEAD
              index === 2 ? "col-span-2 md:col-span-1" : ""
            } rounded-xl border p-4 sm:p-6 flex flex-col items-center justify-center bg-(--bg-secondary) border-bg-gray-1
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-(--text-main)">
              {stat.value}
            </h3>
            <p
              className="text-[11px] sm:text-[15px] text-center mt-1 whitespace-nowrap text-gray"
=======
              index === 2 ? "col-span-2 lg:col-span-1" : ""
            } w-full rounded-xl border p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden ${
              theme === "dark"
                ? "bg-bg-dark border-bg-gray-1"
                : "bg-white border-gray-300"
            }`}
          >
            <h3 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-bold text-center">
              {stat.value}
            </h3>
            <p
              className={`text-[10px] sm:text-[13px] md:text-[12px] lg:text-[15px] text-center mt-1 whitespace-normal md:whitespace-nowrap lg:whitespace-nowrap leading-snug px-1 ${
                theme === "dark" ? "text-gray" : "text-gray-500"
              }`}
>>>>>>> main
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