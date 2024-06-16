import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "../styles/TopBar.css";

const TopBar = () => {
  const navigate = useNavigate();

  const handleUserSelect = (username) => {
    console.log("Selected user:", username);
    navigate(`/profile/${username}`);
  };
  return (
    <nav className="topbar">
      <SearchBar onSelect={handleUserSelect} />
    </nav>
  );
};
export default TopBar;
