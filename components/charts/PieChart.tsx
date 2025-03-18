"use client";

import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/context/ThemeContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

interface CategoryData {
  name: string;
  value: number;
}

export default function CategoryPieChart({ data }: { data: CategoryData[] }) {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 440);
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartData = data.length
    ? data
    : [
      { name: "Fixed", value: 45.46 },
      { name: "Postpaid", value: 34.54 },
      { name: "Prepaid", value: 20 },
    ];

  // Dynamic radius based on screen size
  const outerRadius = isMobile ? 80 : 120;
  const innerRadius = isMobile ? 40 : 60;

  // Dynamic height for ResponsiveContainer
  const chartHeight = isMobile ? 200 : 400;

  return (
    <div
      className={`${theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-transparent text-gray-700"
        } p-6 rounded-lg shadow-md dark:border-gray-700 flex flex-col items-center w-full max-w-full overflow-hidden`}
    >
      <h2 className="text-xl font-semibold mb-4">
        Category Distribution (2025)
      </h2>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
            labelLine={!isMobile} // Hide label lines on mobile
            label={
              !isMobile
                ? ({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(1)}%)`
                : false // Hide labels on mobile
            }
            startAngle={90}
            endAngle={-270}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={theme === "dark" ? "#ffffff" : "#000000"}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#1f2937",
              border: theme === "dark" ? "1px solid #374151" : "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              fontSize: isMobile ? "12px" : "14px",
              padding: isMobile ? "4px 8px" : "8px 12px",
            }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)}`,
              name,
            ]}
            wrapperStyle={{
              pointerEvents: "auto", // Ensure tooltip is touch-friendly
            }}
          />
          <Legend
            layout={isMobile ? "horizontal" : "vertical"}
            align={isMobile ? "center" : "right"}
            verticalAlign={isMobile ? "bottom" : "middle"}
            wrapperStyle={{
              paddingTop: isMobile ? "10px" : "20px",
              fontSize: isMobile ? "12px" : "14px",
              color: theme === "dark" ? "#d1d5db" : "#374151",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}