import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const { user, updateUserTheme } = useAuth();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (user && user.theme) {
      setTheme(user.theme);
      document.body.classList.toggle("dark-mode", user.theme === "dark");
    }
  }, [user]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
    if (user) {
      updateUserTheme(user.uid, newTheme);
    }
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
