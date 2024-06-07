import React, { useState } from "react";
import "../styles/ProgramsSidebar.css"; // Assuming you have a CSS file for styling

const ProgramsSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("Toggling sidebar");
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "X" : "☰"}
      </button>
      {isOpen && (
        <div className="sidebar-content">
          <h2>Sidebar Header</h2>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProgramsSidebar;
