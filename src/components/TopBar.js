import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase/firebaseConfig";
import "../styles/TopBar.css";

const TopBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/"); // Redirect to Home page after logout
  };

  return (
    <nav className="topbar">
      <button className="nav-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default TopBar;
