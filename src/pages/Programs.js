import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/program/Sidebar";

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
    <div className="programs-page">
      <Sidebar />
      <div className="programs-content">
        <h2>Programs</h2>
        <input
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
        </ul>
      </div>
    </div>
  );
};

export default Programs;
