import { motion } from "framer-motion";
import { useTheme } from "../../../Context/ThemeContext";
import { StaggerContainer, staggerItem } from "../../common/StaggerContainer";

interface Stat {
  value: string;
  label: string;
}

interface PropsStatsBar {
  stats: Stat[];
}

const StatsBar = ({ stats }: PropsStatsBar) => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full py-6 max-2xl:gap-4 2xl:gap-5 ${
        theme === "dark"
          ? " border-bg-gray-1"
          : "bg-gray-50 border-gray-300"
      }`}
    >
      <StaggerContainer className="grid w-full grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className={`${
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