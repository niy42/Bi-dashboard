import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useTheme } from "@/context/ThemeContext";

interface MetricsCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
}

export default function MetricsCard({ title, value, icon }: MetricsCardProps) {
  const { theme } = useTheme();
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.98 }} // Slight press effect
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="w-full"
    >
      <Card
        className={`shadow-lg rounded-2xl ${theme === "dark" ? "!bg-gray-900 !text-gray-200" : "!bg-gray-200 !text-gray-700"} overflow-hidden relative`}
      >
        {icon && (
          <div className="absolute top-4 left-4 opacity-70">
            {icon}
          </div>
        )}
        <CardContent className="p-6 text-center relative z-10">
          <Typography
            variant="subtitle1"
            className=" uppercase tracking-wider font-semibold mb-3 drop-shadow-sm"
          >
            {title}
          </Typography>
          <Typography
            variant="h3"
            className="font-extrabold drop-shadow-md"
          >
            {value}
          </Typography>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mx-auto opacity-80" />
        </CardContent>
        {/* Subtle Overlay Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-200/10 to-transparent pointer-events-none" />
      </Card>
    </motion.div>
  );
}