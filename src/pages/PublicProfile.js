import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FriendRequestButton from "../components/FriendRequestButton";

const PublicProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(`Fetching user with username: ${username}`);
        // Fetch user details by username
        const response = await axios.get(
          `http://localhost:5000/api/users/username/${username}`
        );
        console.log(`Fetched user data: ${response.data}`);
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
      <h1>{userData.username}'s Profile</h1>
      <p>Email: {userData.email}</p>
      {/* Other user data */}
      <FriendRequestButton />
    </div>
  );
};

export default PublicProfile;
