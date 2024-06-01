import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button onClick={toggleSidebar}>{isOpen ? "Collapse" : "Expand"}</button>
      {isOpen && (
        <ul>
          <li>
            <Link to="/programs">Programs</Link>
          </li>
          <li>
            <Link to="/personal-records">Personal Records</Link>
          </li>
          <li>
            <Link to="/current-program">Current Program</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
