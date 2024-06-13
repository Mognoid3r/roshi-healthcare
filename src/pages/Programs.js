import React from "react";
import Tback from "../components/TBack";
import ProgramsList from "../components/program/ProgramsList";

const Programs = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Tback
        color="#3498db"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />
      <div style={{ position: "absolute", zIndex: 1, top: 0, width: "100%" }}>
        <ProgramsList />
      </div>
    </div>
  );
};

export default Programs;
