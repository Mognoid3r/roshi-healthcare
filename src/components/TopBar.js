import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../services/firebase/firebaseConfig";
import SearchBar from "./SearchBar";
import "../styles/TopBar.css";

const TopBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/"); // Redirect to Home page after logout
  };

  const handleUserSelect = (username) => {
    console.log("Selected user:", username);
    // Implement additional logic if needed
  };

  return (
    <nav className="topbar">
      <div className="nav-content">
        <div className="nav-item">
          <SearchBar onSelect={handleUserSelect} />
        </div>
        <button className="nav-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TopBar;
