// AcceptFriendRequestButton.js
import React, { useState } from "react";
import axios from "axios";

const AcceptFriendRequestButton = ({ currentUserId, friendUserId }) => {
  const [error, setError] = useState("");

  const acceptFriendRequest = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/accept-friend-request`,
        {
          currentUserId,
          friendUserId,
        }
      );
      alert("Friend request accepted successfully");
    } catch (error) {
      console.error("Error accepting friend request:", error);
      setError("Error accepting friend request");
    }
  };

  return (
    <div>
      <button onClick={acceptFriendRequest}>Accept Friend Request</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AcceptFriendRequestButton;
