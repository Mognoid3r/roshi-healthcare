// src/components/DarkModeToggle.js

import React from "react";
import { useTheme } from "../hooks/ThemeContext";
import "../styles/DarkModeToggle.css";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="dark-mode-toggle">
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
};

export default DarkModeToggle;
