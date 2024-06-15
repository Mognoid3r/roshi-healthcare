import React from "react";
import ProgramsList from "../components/program/ProgramsList";
import PageLayout from "../components/PageLayout";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";

const ProgramsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // height: 100vh;
  // width: 100vw;
  text-align: center;
  color: #333;
  z-index: 1;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Programs = () => {
  const { user } = useAuth();

  return (
    <PageLayout>
      <ProgramsContainer>
        <Title>Programs</Title>
        <Description>Here are your programs, {user.username}</Description>
        <ProgramsList />
      </ProgramsContainer>
    </PageLayout>
  );
};

export default Programs;
