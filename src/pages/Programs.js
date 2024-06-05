import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgramsSidebar from "../components/ProgramsSidebar";
import AppLayout from "../components/AppLayout";
import "../styles/Programs.css"; // Assuming you have a CSS file for styling

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get("/api/programs");
      setPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <AppLayout>
      <ProgramsSidebar />
      <div className="programs-page">
        <div className="programs-header">
          <h2>Programs</h2>
          <input
            type="text"
            placeholder="Search programs..."
            value={filter}
            onChange={handleFilterChange}
            className="programs-search"
          />
        </div>
        <div className="programs-list">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="program-card">
              <h3>{program.name}</h3>
              <p>{program.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Programs;

{
  /* <input
          type="text"
          placeholder="Filter programs"
          value={filter}
          onChange={handleFilterChange}
        />
        <button>Create Program</button>
        <ul>
          {filteredPrograms.map((program) => (
            <li key={program._id}>{program.name}</li>
          ))}
        </ul> */
}
