import { useTheme } from "../../../Context/ThemeContext";

interface Stat {
  value: string;
  label: string;
}

interface PropsStatsBar {
  stats: Stat[];
}

const StatsBar = ({ stats }: PropsStatsBar) =>
   {
  const { theme } = useTheme();

  return (
    <div className={`py-6 max-2xl:gap-4 2xl:gap-5
      ${
      theme === "dark"
        ? " border-bg-gray-1 "
        : "bg-gray-50 border-gray-300"
    }`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${
              index === 2 ? "col-span-2 md:col-span-1" : ""
            } rounded-xl border p-4 sm:p-6 flex flex-col items-center justify-center ${
              theme === "dark"
                ? "bg-bg-dark border-bg-gray-1"
                : "bg-white border-gray-300"
            }`}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center">{stat.value}</h3>
            <p className={`text-[11px] sm:text-[15px] text-center mt-1 whitespace-nowrap ${theme === "dark" ? "text-gray" : "text-gray-500"}`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
