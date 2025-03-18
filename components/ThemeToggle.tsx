import React from 'react';
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";

const ThemeToggle = ({ currentTheme, setTheme }: { currentTheme: string; setTheme: (theme: string) => void }) => {
    if (!currentTheme) return null;

    const isDarkMode = currentTheme === 'dark';

    const handleToggle = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setTheme(newTheme);
        console.log(`Theme toggled to: ${newTheme}`);
    };

    return (
        <button
            onClick={handleToggle}
            className={`flex items-center justify-center p-2 rounded-full transition-colors duration-300 cursor-pointer 
        ${isDarkMode ? '!bg-gray-700 !text-yellow-300 hover:!bg-gray-600' : '!bg-yellow-300 !text-gray-700 hover:!bg-yellow-200'}`}
            aria-label="Toggle theme"
        >
            {isDarkMode ? <PiToggleRightFill className="h-6 w-6" /> : <PiToggleLeftFill className="h-6 w-6" />}
        </button>

    );
};

export default ThemeToggle;
