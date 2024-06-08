import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/PublicProfile.css";

const PublicProfile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${uid}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Error fetching user data");
      }
    };
    fetchUser();
  }, [uid]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="public-profile">
      <h1>{userData.username}'s Profile</h1>
      {/* Display other user data as needed */}
    </div>
  );
};

export default PublicProfile;
