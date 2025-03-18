import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "@/context/ThemeContext";

interface UserGrowthData {
  month: string;
  users: number;
}

export default function UserBarChart({ data }: { data: UserGrowthData[] }) {
  const { theme } = useTheme();

  const chartData = data.length
    ? data
    : [
      { month: "Jan", users: 1400 },
      { month: "Feb", users: 1450 },
      { month: "Mar", users: 1500 },
      { month: "Apr", users: 1550 },
      { month: "May", users: 1600 },
      { month: "Jun", users: 1580 },
      { month: "Jul", users: 1620 },
      { month: "Aug", users: 1650 },
      { month: "Sep", users: 1670 },
      { month: "Oct", users: 1700 },
      { month: "Nov", users: 1720 },
      { month: "Dec", users: 1753 },
    ];

  return (
    <div
      className={`${theme === "dark" ? "!bg-gray-900 !text-gray-200" : "!bg-transparent !text-gray-700"
        } p-6 rounded-lg shadow-md dark:border-gray-700`}
    >
      <h2 className="text-xl font-semibold mb-4">
        User Growth (2025)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={600}
          height={400}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          barCategoryGap={10}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" opacity={0.7} />
          <XAxis
            dataKey="month"
            stroke={theme === "dark" ? "#d1d5db" : "#374151"}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke={theme === "dark" ? "#d1d5db" : "#374151"}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => [`${value}`, "Users"]}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px", color: theme === "dark" ? "#d1d5db" : "#374151" }}
          />
          <Bar
            dataKey="users"
            fill="#82ca9d"
            barSize={20}
            radius={[4, 4, 0, 0]}
            activeBar={{ fill: "#5cb789" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}