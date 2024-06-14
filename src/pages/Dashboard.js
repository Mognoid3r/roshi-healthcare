// Code below works great:

import React, { useState } from "react";
import styled from "styled-components";
import PageLayout from "../components/PageLayout";

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

const Dashboard = () => {
  return (
    <PageLayout>
      <DashboardContainer>
        <Title>Dashboard</Title>
        <Description>Welcome to the main hub of the application.</Description>
      </DashboardContainer>
    </PageLayout>
  );
};

export default Dashboard;

// Trying to add dynamic content load into Dashboard main component:
