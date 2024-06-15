import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import "../styles/FriendsList.css";

const FriendsList = () => {
  const { user: currentUser } = useAuth(); // Get current user data from useAuth
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setFriends(currentUser.friends); // Directly set friends from currentUser
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
        setError("Error fetching friends");
        setLoading(false);
      }
    };

    if (currentUser && currentUser.friends) {
      fetchFriends();
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading friends...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="friends-list">
      <h2>Friends</h2>
      {friends.length === 0 ? (
        <p>No friends found.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.uid}>
              <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsList;
