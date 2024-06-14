import React from "react";
import Tback from "../components/TBack";
import ProgramsList from "../components/program/ProgramsList";
import PageLayout from "../components/PageLayout";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #333;
  z-index: 1;
  position: relative;
`;

const Programs = () => {
  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default Programs;
