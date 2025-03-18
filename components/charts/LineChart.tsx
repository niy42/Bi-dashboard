import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTheme } from "@/context/ThemeContext";

interface SalesData {
  month: string;
  sales: number;
}

export default function SalesLineChart({ data }: { data: SalesData[] }) {
  const { theme } = useTheme();

  const chartData = data.length
    ? data
    : [
      { month: "Jan", sales: 5000 },
      { month: "Feb", sales: 4800 },
      { month: "Mar", sales: 5200 },
      { month: "Apr", sales: 4900 },
      { month: "May", sales: 5300 },
      { month: "Jun", sales: 5100 },
      { month: "Jul", sales: 5400 },
      { month: "Aug", sales: 5200 },
      { month: "Sep", sales: 5500 },
      { month: "Oct", sales: 5300 },
      { month: "Nov", sales: 5600 },
      { month: "Dec", sales: 5400 },
    ];

  return (
    <div
      className={`${theme === "dark" ? "!bg-gray-900 !text-gray-200" : "!bg-transparent !text-gray-700"
        } p-6 rounded-lg shadow-md dark:border-gray-700`}
    >
      <h2 className="text-xl font-semibold mb-4">
        Sales Trends (2025)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={600}
          height={400}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
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
            tickFormatter={(value) => `$${value / 1000}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => [`$${value}`, "Sales"]}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px", color: theme === "dark" ? "#d1d5db" : "#374151" }}
          />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            strokeWidth={3}
            dot={{ r: 6, fill: "#8884d8" }}
            activeDot={{ r: 8, fill: "#fff", stroke: "#8884d8", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}