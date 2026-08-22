import { useTheme } from "../Context/ThemeContext";

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
    <div className={`  p-6   max-sm:gap-4 max-2xl:gap-4 2xl:gap-5
      ${
      theme === "dark"
        ? " border-gray-400"
        : "bg-gray-50 border-gray-300"
    }`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
        {stats.map((stat, index) => (
              <div
            key={index}
 
            className={`${
              index === 2 ? "col-span-2 md:col-span-1 w-full" : ""
            } rounded-xl border max-w-[238.3333282470703px] max-h-[137px] p-6 ${
              theme === "dark" 
                ? "bg-[#1A1A1A] border-[#262626]" 
                : "bg-white border-gray-300"
            }`}
          >
            <h3 className="text-3xl font-bold text-center">{stat.value}</h3>
            <p className={theme === "dark" ? "text-gray-400 text-center" : "text-gray-500 text-center"}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
