import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PublicProfile = () => {
  const { uid } = useParams(); // This will extract the uid from the URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${uid}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (uid) {
      fetchUser();
    }
  }, [uid]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.username}'s Profile</h1>
      {/* Display other user data here */}
    </div>
  );
};

export default PublicProfile;
