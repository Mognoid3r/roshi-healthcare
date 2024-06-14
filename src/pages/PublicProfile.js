import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FriendRequestButton from "../components/FriendRequestButton";
import { useAuth } from "../hooks/useAuth";
import styled from "styled-components";
import PageLayout from "../components/PageLayout";

const PublicProfileContainer = styled.div`
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

const PublicProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { user: currentUser } = useAuth(); // Get the current user's data from the context

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/username/${username}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      }
    };

    fetchUserData();
  }, [username]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageLayout>
        <PublicProfileContainer>
          <h1>{userData.username}'s Profile</h1>
          <p>Email: {userData.email}</p>
          {/* Other user data */}
          <FriendRequestButton
            currentUserId={currentUser.uid} // Pass the current user's ID
            friendUsername={userData.username} // Pass the profile's username
          />
        </PublicProfileContainer>
      </PageLayout>
    </div>
  );
};

export default PublicProfile;
