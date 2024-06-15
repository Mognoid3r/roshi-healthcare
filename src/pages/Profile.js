import React from "react";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import PageLayout from "../components/PageLayout";
import FriendsList from "../components/FriendsList";
import DarkModeToggle from "../components/DarkModeToggle";

const ProfileContainer = styled.div`
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
    font-size: 0.5rem;
  }
`;

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <PageLayout>
      <ProfileContainer>
        <Title>Profile</Title>
        <Description>Hello {user.username}</Description>
        <DarkModeToggle />

        <FriendsList userId={user.uid} />
      </ProfileContainer>
    </PageLayout>
  );
};

export default Dashboard;
