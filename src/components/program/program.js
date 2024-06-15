import React from "react";
import "../styles/program.css";
const Program = ({ program }) => {
  return (
    <div className="program-details">
      <h3>{program.programName}</h3>
      <p>{program.programGoal}</p>
      {/* Additional details or functionalities can go here */}
    </div>
  );
};

export default Program;
