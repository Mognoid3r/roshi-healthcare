// src/components/DashboardContent.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import ProgramList from "./program/ProgramsList";

const DashboardContent = () => {
  return (
    <Routes>
      <Route path="programs" element={<ProgramList />} />
    </Routes>
  );
};

export default DashboardContent;
