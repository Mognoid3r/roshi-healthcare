// ProfileDetails.js
import React from "react";

const ProfileDetails = ({ userData }) => {
  return (
    <div>
      <h2>{userData.username}'s Details</h2>
      <p>Email: {userData.email}</p>
      <p>Theme: {userData.theme}</p>
      {/* Render other user-specific details here */}
    </div>
  );
};

export default ProfileDetails;
