import { useTheme } from "../../Context/ThemeContext";

interface PropsStatsBar {
  values: string[];
  labels: string[];
}

const StatsBar = ({ values, labels }: PropsStatsBar) => {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {values.map((value, index) => (
        <div
          key={index}
          className={`rounded-xl p-6 border ${
            theme === "dark"
              ? "bg-bg-dark border-gray-400"
              : "bg-gray-50 border-gray-300"
          } ${index === 2 ? "col-span-2 md:col-span-1" : ""}`}
        >
          <h3 className="text-3xl font-bold">{value}</h3>

          <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            {labels[index]}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
