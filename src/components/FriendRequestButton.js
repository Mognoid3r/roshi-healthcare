import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const FriendRequestButton = ({ friendUsername }) => {
  const { user: currentUser } = useAuth(); // Get the current user's data from the context
  const [isPending, setIsPending] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const friendUsernameDoc = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/users/username/${friendUsername}`
        );
        const friendUid = friendUsernameDoc.data.uid;

        if (currentUser.friends.some((friend) => friend.uid === friendUid)) {
          setIsFriend(true);
        } else if (currentUser.outgoingFriendRequests.includes(friendUid)) {
          setIsPending(true);
        }
      } catch (error) {
        console.error("Error fetching friend data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchFriendData();
  }, [currentUser, friendUsername]);

  const sendFriendRequest = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/send-friend-request`,
        {
          currentUserId: currentUser.uid,
          friendUsername,
        }
      );
      setIsPending(true);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const cancelFriendRequest = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/cancel-friend-request`,
        {
          currentUserId: currentUser.uid,
          friendUsername,
        }
      );
      setIsPending(false);
    } catch (error) {
      console.error("Error cancelling friend request:", error);
    }
  };

  const removeFriend = async () => {
    try {
      console.log(`Removing friend with username: ${friendUsername}`);
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/remove-friend`,
        {
          currentUserId: currentUser.uid,
          friendUsername,
        }
      );
      console.log("Friend removed successfully");
      setIsFriend(false);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  if (isFriend) {
    return (
      <button
        onClick={removeFriend}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Remove Friend
      </button>
    );
  }

  return (
    <div>
      {isPending ? (
        <button
          onClick={cancelFriendRequest}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Cancel Request
        </button>
      ) : (
        <button onClick={sendFriendRequest}>Send Friend Request</button>
      )}
    </div>
  );
};

export default FriendRequestButton;
