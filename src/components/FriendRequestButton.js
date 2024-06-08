import React from "react";
import axios from "axios";

const FriendRequestButton = ({ currentUserId, friendUsername }) => {
  const sendFriendRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/send-friend-request",
        {
          currentUserId,
          friendUsername,
        }
      );
      console.log("Friend request sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  return <button onClick={sendFriendRequest}>Send Friend Request</button>;
};

export default FriendRequestButton;
