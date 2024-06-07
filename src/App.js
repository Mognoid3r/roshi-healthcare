import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/AppRoutes";
import { ThemeProvider } from "./hooks/ThemeContext";
import { AuthProvider } from "./hooks/useAuth";
import "./styles/App.css";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
