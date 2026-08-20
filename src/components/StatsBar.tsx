import { useTheme } from "../context/ThemeContext";

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
    <div className={`rounded-xl border p-6 ${
      theme === "dark"
        ? "bg-bg-dark border-gray-400"
        : "bg-gray-50 border-gray-300"
    }`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={index === 2 ? "col-span-2 md:col-span-1" : ""}
          >
            <h3 className="text-3xl font-bold">{stat.value}</h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
