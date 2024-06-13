// Code below works great:

import React, { useState } from "react";
import styled from "styled-components";
import PageLayout from "../components/PageLayout";
import Tback from "../components/TBack";
import Profile from "./Profile"; // Assume these components exist
import Community from "./Community"; // Assume these components exist

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

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; // Ensure background is below all other content
  pointer-events: none; // Ensure background doesn't interfere with clicking
  overflow: hidden;
`;

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "profile":
        return <Profile />;
      case "community":
        return <Community />;
      default:
        return (
          <>
            <Title>Dashboard</Title>
            <Description>
              Welcome to the main hub of the application.
            </Description>
          </>
        );
    }
  };

  return (
    <PageLayout>
      <DashboardContainer>{renderComponent()}</DashboardContainer>
      <BackgroundWrapper>
        <Tback color="#DD3845" />
      </BackgroundWrapper>
    </PageLayout>
  );
};

export default Dashboard;

// Trying to add dynamic content load into Dashboard main component:
