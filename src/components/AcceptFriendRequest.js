// AcceptFriendRequestButton.js

import axios from "axios";
import React from "react";

const AcceptFriendRequestButton = ({ currentUserId, friendUserId }) => {
  const acceptFriendRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/accept-friend-request",
        {
          currentUserId: currentUserId,
          friendUserId: friendUserId,
        }
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return <button onClick={acceptFriendRequest}>Accept Friend Request</button>;
};

export default AcceptFriendRequestButton;
