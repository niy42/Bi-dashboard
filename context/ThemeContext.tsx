// context/ThemeContext.tsx
"use client";

import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";

interface ThemeContextProps {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: "light",
    setTheme: () => { },
});

const ThemeProvider: React.FC<{ children: ReactNode; initialTheme?: string }> = ({
    children,
    initialTheme,
}) => {
    const [theme, setTheme] = useState<string>(initialTheme || "light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme && savedTheme !== theme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        document.cookie = `theme=${theme}; path=/; max-age=31536000`; // Sync to cookie
    }, [theme]);

    const muiTheme = createTheme({
        palette: {
            mode: theme as "light" | "dark",
            text: {
                primary: theme === "dark" ? "#e5e7eb" : "#374151",
            },
            background: {
                paper: theme === "dark" ? "#1f2937" : "#ffffff",
                default: theme === "dark" ? "#111827" : "#f9fafb",
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export { ThemeProvider, useTheme };