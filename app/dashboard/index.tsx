"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Button, Snackbar, Alert } from "@mui/material";
import MetricsCard from "@/components/MetricsCard";
import SalesLineChart from "@/components/charts/LineChart";
import UserBarChart from "@/components/charts/BarChart";
import CategoryPieChart from "@/components/charts/PieChart";
import DataTable from "@/components/DataTable";
import { mockDashboardData } from "@/lib/mockData";
import { AttachMoney, People, TrendingUp } from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Dashboard() {
  const { data: session, status } = useSession() as {
    data: { user?: { name?: string; email?: string; keepLoggedIn?: boolean } } | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const { theme, setTheme } = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  console.log(`Logging status: ${session?.user?.keepLoggedIn}`);

  useEffect(() => {
    console.log("useEffect running, keepLoggedIn:", session?.user?.keepLoggedIn);
    if (!session || session?.user?.keepLoggedIn === true) return;

    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log("Timer expired, opening Snackbar");
        setOpenSnackbar(true);
        setTimeout(() => {
          console.log("Logging out now");
          signOut({ callbackUrl: "/" });
        }, 3000);
      }, 60 * 1000); // 1 minute
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimeout));

    resetTimeout();

    return () => {
      clearTimeout(timeout);
      events.forEach((event) => window.removeEventListener(event, resetTimeout));
    };
  }, [session]);

  // Animated loading state
  if (status === "loading") {
    return (
      <div className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-200"} flex items-center justify-center min-h-screen`}>
        < div className="flex flex-col items-center" >
          {/* Spinning Loader */}
          < div
            className={`w-12 h-12 border-4 ${theme === "dark" ? "border-gray-200" : "border-gray-700"
              } border-t-transparent rounded-full animate-spin`
            }
          ></div >
          {/* Loading Text with Pulse */}
          < p
            className={`mt-4 text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-700"
              } animate-pulse`
            }
          >
            Loading...
          </p >
        </div >
      </div >
    );
  }

  if (status === "unauthenticated") redirect("/");

  const { totalUsers, activeSessions, salesRevenue, salesData, userGrowth, categoryDist, tableData } =
    mockDashboardData;

  return (
    <div className="p-6 min-h-screen">
      <div
        className={`flex flex-col sm:flex-row justify-between items-center mb-8 ${theme === "dark" ? "bg-gray-900" : "bg-gray-200"
          } p-4 rounded-lg shadow-sm`}
      >
        <h1
          className={`text-3xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}
        >
          BI Dashboard
        </h1>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <ThemeToggle currentTheme={theme} setTheme={setTheme} />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 sm:p-4">
        <MetricsCard
          title="Total Users"
          value={totalUsers}
          icon={<People fontSize="medium" />}
        />
        <MetricsCard
          title="Active Sessions"
          value={activeSessions}
          icon={<TrendingUp fontSize="medium" />}
        />
        <MetricsCard
          title="Sales Revenue"
          value={`$${salesRevenue.toLocaleString()}`}
          icon={<AttachMoney fontSize="medium" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SalesLineChart data={salesData} />
        <UserBarChart data={userGrowth} />
        <CategoryPieChart data={categoryDist} />
      </div>

      <div
        className={`${theme === "dark" ? "!bg-gray-900 !text-gray-200" : "!bg-transparent !text-gray-700"
          } p-6 rounded-lg shadow-md dark:border-gray-700`}
      >
        <h2 className="text-xl font-semibold mb-4">User Sales Data</h2>
        <DataTable data={tableData} />
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Logging out due to inactivity...
        </Alert>
      </Snackbar>
    </div>
  );
}