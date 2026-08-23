"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="cursor-target relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-300 dark:border-white/20 bg-white/80 dark:bg-black/60 text-gray-800 dark:text-white shadow-md hover:scale-105 active:scale-95 transition-all duration-300 focus-ring"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-800 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <SunIcon className="w-4 h-4 md:w-5 md:h-5 text-[#ff3b11] transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  );
}
